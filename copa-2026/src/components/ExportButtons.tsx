import { useState, type RefObject } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

interface Props {
  boardRef: RefObject<HTMLDivElement>;
  zoom: number;
  setZoom: (z: number) => void;
  notify: (msg: string) => void;
}

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function ExportButtons({ boardRef, zoom, setZoom, notify }: Props) {
  const [busy, setBusy] = useState<'png' | 'pdf' | null>(null);

  async function capture(): Promise<HTMLCanvasElement | null> {
    const el = boardRef.current;
    if (!el) return null;
    const prevZoom = zoom;
    setZoom(1); // captura sempre em escala natural, em alta qualidade
    await wait(500);
    try {
      return await html2canvas(el, {
        scale: 2,
        backgroundColor: '#050505',
        useCORS: true,
        logging: false,
      });
    } finally {
      setZoom(prevZoom);
    }
  }

  async function exportPNG() {
    setBusy('png');
    try {
      const canvas = await capture();
      if (!canvas) return;
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'copa-do-mundo-fifa-2026.png';
        a.click();
        URL.revokeObjectURL(url);
      }, 'image/png');
      notify('Imagem PNG exportada!');
    } catch (e) {
      console.error(e);
      notify('Erro ao exportar PNG.');
    } finally {
      setBusy(null);
    }
  }

  async function exportPDF() {
    setBusy('pdf');
    try {
      const canvas = await capture();
      if (!canvas) return;
      const img = canvas.toDataURL('image/jpeg', 0.92);
      const w = canvas.width / 2;
      const h = canvas.height / 2;
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [w, h],
        hotfixes: ['px_scaling'],
      });
      pdf.addImage(img, 'JPEG', 0, 0, w, h);
      pdf.save('copa-do-mundo-fifa-2026.pdf');
      notify('PDF exportado!');
    } catch (e) {
      console.error(e);
      notify('Erro ao exportar PDF.');
    } finally {
      setBusy(null);
    }
  }

  const btn =
    'h-9 px-3 rounded-md border border-gold-dark bg-panel text-[12px] font-semibold tracking-wide text-gold-light hover:bg-gold hover:text-black transition-colors disabled:opacity-50 disabled:pointer-events-none';

  return (
    <>
      <button className={btn} onClick={exportPNG} disabled={busy !== null}>
        {busy === 'png' ? 'Exportando…' : '📷 Exportar PNG'}
      </button>
      <button className={btn} onClick={exportPDF} disabled={busy !== null}>
        {busy === 'pdf' ? 'Exportando…' : '📄 Exportar PDF'}
      </button>
    </>
  );
}
