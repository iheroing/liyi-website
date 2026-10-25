/**
 * 界面音：用 WebAudio 现合成，不加音频文件。
 *
 * 一张卡片扫过去就要响一声，用 <audio> 会被解码和重放延迟拖住；
 * 而为了几十毫秒的一声再下一个几百 KB 的文件，也不划算。
 *
 * 总开关就是右下角那个「声音」按钮 —— 没按下之前一声都不发。浏览器
 * 本来也要求音频上下文由一次用户手势创建，这正好对上：按下开关的
 * 那一刻就是那次手势。
 */

let ctx: AudioContext | null = null
let enabled = false
let lastBlip = 0

export function setSoundEnabled(next: boolean) {
    enabled = next
    if (!next || typeof window === "undefined") return
    ctx ??= new AudioContext()
    void ctx.resume()
}

type Blip = { from: number; to: number; duration: number; gain: number; type?: OscillatorType }

function blip({ from, to, duration, gain, type = "triangle" }: Blip) {
    if (!enabled || !ctx || ctx.state !== "running") return
    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const amp = ctx.createGain()
    osc.type = type
    osc.frequency.setValueAtTime(from, now)
    osc.frequency.exponentialRampToValueAtTime(to, now + duration)
    // 起音留 6ms。从 0 直接跳到峰值会在扬声器上炸出一声「咔」
    amp.gain.setValueAtTime(0.0001, now)
    amp.gain.exponentialRampToValueAtTime(gain, now + 0.006)
    amp.gain.exponentialRampToValueAtTime(0.0001, now + duration)
    osc.connect(amp).connect(ctx.destination)
    osc.start(now)
    osc.stop(now + duration + 0.02)
}

/** 扫过一张卡：很轻的一声，比视觉上的抬起先到一点 */
export function playHover() {
    // 鼠标横着划过整排牌会连发五六声，听着像静电。隔开 110ms
    const now = performance.now()
    if (now - lastBlip < 110) return
    lastBlip = now
    blip({ from: 2080, to: 1560, duration: .07, gain: .028 })
}

/** 打开一张卡：低一点、长一点，像一张牌被抽出来 */
export function playOpen() {
    blip({ from: 880, to: 430, duration: .17, gain: .05, type: "sine" })
}
