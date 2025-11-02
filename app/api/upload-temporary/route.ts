import { NextRequest, NextResponse } from 'next/server';

// 临时图片存储API (使用内存或文件系统)
// 注意: 生产环境应使用真实的CDN或对象存储服务

const uploadedImages = new Map<string, string>();

export async function POST(request: NextRequest) {
  try {
    const { image } = await request.json();

    if (!image || !image.startsWith('data:image/')) {
      return NextResponse.json({ error: '无效的图片数据' }, { status: 400 });
    }

    // 生成唯一ID
    const imageId = `img_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

    // 存储图片 (临时方案)
    uploadedImages.set(imageId, image);

    // 设置过期时间 (24小时后清理)
    setTimeout(() => {
      uploadedImages.delete(imageId);
    }, 24 * 60 * 60 * 1000);

    // 返回临时URL
    const url = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/images/${imageId}`;

    return NextResponse.json({
      success: true,
      url,
      imageId,
      expiresIn: '24h'
    });
  } catch (error) {
    console.error('临时上传失败:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '上传失败' },
      { status: 500 }
    );
  }
}

// 获取临时图片
export async function GET(request: NextRequest) {
  const imageId = request.nextUrl.searchParams.get('id');

  if (!imageId) {
    return NextResponse.json({ error: '缺少图片ID' }, { status: 400 });
  }

  const imageData = uploadedImages.get(imageId);

  if (!imageData) {
    return NextResponse.json({ error: '图片不存在或已过期' }, { status: 404 });
  }

  // 返回base64图片
  return NextResponse.json({
    success: true,
    data: imageData
  });
}
