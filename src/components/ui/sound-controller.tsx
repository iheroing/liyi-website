"use client"

import { useRef, useState } from "react"
import { Volume2, VolumeX } from "lucide-react"
import { setSoundEnabled } from "@/lib/sound"

export function SoundController() {
    const audio = useRef<HTMLAudioElement>(null)
    const [playing, setPlaying] = useState(false)
    async function toggle() {
        if (!audio.current) return
        if (playing) { audio.current.pause(); setSoundEnabled(false); setPlaying(false); return }
        audio.current.volume = .12
        // 这个开关管全站的声音：环境音，加上卡片的悬停与打开。
        // 合成器必须在这次点击里建出来，否则浏览器不让它发声。
        setSoundEnabled(true)
        try { await audio.current.play(); setPlaying(true) } catch { setPlaying(true) }
    }
    return <div className="pf-sound"><audio ref={audio} src="/audio/ambience.mp3" preload="none" loop /><button type="button" onClick={toggle} aria-label={playing ? "关闭声音" : "打开声音"} aria-pressed={playing}>{playing ? <Volume2 size={16} /> : <VolumeX size={16} />}<span>声音 {playing ? "开" : "关"}</span></button></div>
}
