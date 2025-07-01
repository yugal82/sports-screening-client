import { QRCodeCanvas } from 'qrcode.react';

interface QRCodeDisplayProps {
  value: string;
  size?: number;
}

export function QRCodeDisplay({ value, size = 200 }: QRCodeDisplayProps) {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-[#121212] rounded-xl shadow-lg">
      <QRCodeCanvas value={value} size={size} bgColor="#121212" fgColor="#1DB954" level="H" includeMargin={true} />
      <p className="mt-4 text-[#B3B3B3] text-center text-sm">Scan this QR code at the venue to validate your pass.</p>
    </div>
  );
}
