"use client"

import { motion } from "framer-motion"
import { PROFILE } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { ShimmerButton } from "@/components/ui/shimmer-button"
import { Mail, MapPin } from "lucide-react"

export function Contact() {
    return (
        <section id="contact" className="py-24 bg-background">
            <div className="container px-4 md:px-6 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center text-center space-y-6"
                >
                    <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl font-heading">联系我</h2>
                    <span className="text-muted-foreground text-sm tracking-widest uppercase mt-2 font-sans opacity-60">Get in Touch</span>
                    <p className="text-muted-foreground max-w-[600px] text-lg leading-relaxed pt-4">
                        对教育科技、AI 落地感兴趣，或者只是想交个朋友？欢迎随时联系。
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 mt-8">
                        <div className="flex items-center gap-2 text-muted-foreground bg-muted/50 px-4 py-2 rounded-full">
                            <Mail className="h-4 w-4" />
                            <a href={`mailto:${PROFILE.email}`} className="hover:text-primary transition-colors text-sm">{PROFILE.email}</a>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground bg-muted/50 px-4 py-2 rounded-full">
                            <MapPin className="h-4 w-4" />
                            <span className="text-sm">{PROFILE.location}</span>
                        </div>
                    </div>

                    <div className="pt-8">
                        <a href={`mailto:${PROFILE.email}`}>
                            <button
                                style={{
                                    backgroundColor: '#000000',
                                    color: '#ffffff',
                                    padding: '16px 32px',
                                    borderRadius: '50px',
                                    fontWeight: 500,
                                    fontSize: '16px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
                                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                }}
                                onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 15px 50px rgba(0,0,0,0.2)'; }}
                                onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.15)'; }}
                            >
                                发送邮件 <span style={{ opacity: 0.7, marginLeft: '4px', fontWeight: 400 }}>Send Email</span>
                            </button>
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
