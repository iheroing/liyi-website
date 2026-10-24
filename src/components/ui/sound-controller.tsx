"use client"

import { useRef, useState } from "react"
import { Volume2, VolumeX } from "lucide-react"

export function SoundController() {
    const audio = useRef<HTMLAudioElement>(null)
    const [playing, setPlaying] = useState(false)
    async function toggle() {
        if (!audio.current) return
        if (playing) { audio.current.pause(); setPlaying(false); return }
        audio.current.volume = .12
        try { await audio.current.play(); setPlaying(true) } catch { setPlaying(false) }
    }
    return <div className="pf-sound"><audio ref={audio} src="/audio/ambience.mp3" preload="none" loop /><button type="button" onClick={toggle} aria-label={playing ? "关闭环境音" : "播放环境音"} aria-pressed={playing}>{playing ? <Volume2 size={16} /> : <VolumeX size={16} />}<span>声音 {playing ? "开" : "关"}</span></button></div>
}
