import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const imgDirectory = path.join(process.cwd(), 'public/img');
  
  try {
    const filenames = fs.readdirSync(imgDirectory);
    const images = filenames.filter(file => 
      file.toLowerCase().endsWith('.jpg') || 
      file.toLowerCase().endsWith('.jpeg') || 
      file.toLowerCase().endsWith('.png')
    ).map(file => `/img/${file}`);
    
    return NextResponse.json(images);
  } catch (e) {
    return NextResponse.json([]);
  }
}