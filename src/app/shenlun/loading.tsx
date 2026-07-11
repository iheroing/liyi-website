export default function Loading() {
  return (
    <div className="min-h-screen bg-[#f6f1e7] text-[#10233f] grid place-items-center">
      <div className="text-center">
        <div className="mx-auto mb-5 h-10 w-10 border-2 border-[#10233f]/20 border-t-[#e33b36] rounded-full animate-spin" />
        <p className="font-serif text-xl">正在同步最新申论素材</p>
      </div>
    </div>
  );
}
