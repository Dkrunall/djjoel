import Link from 'next/link';
import Image from 'next/image';
import { Syne } from 'next/font/google';

const syne = Syne({ subsets: ['latin'] });

export default function Footer() {
    return (
        <footer className="w-full bg-black text-white pt-20 pb-40 border-t border-white/10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-0">

                    {/* Left Section: Branding */}
                    <div className="flex flex-col justify-center pr-12 md:border-r border-white/10">
                        <div className="relative w-64 h-24 mb-6">
                            <Image
                                src="/jlogo.png"
                                alt="Kurate Logo"
                                fill
                                className="object-contain object-left"
                            />
                        </div>
                        {/* Dynamic Record Label text removed */}
                    </div>

                    {/* Right Section: Links */}
                    <div className="flex flex-col md:pl-20">
                        <div className="grid grid-cols-2 gap-12">

                            {/* Explore Column */}
                            <div className="flex flex-col gap-6">
                                <span className="text-sm text-neutral-500 mb-2">Explore</span>
                                <nav className="flex flex-col gap-4">
                                    {['Home', 'Artists', 'Careers'].map((item) => (
                                        <Link
                                            key={item}
                                            href="#"
                                            className="text-lg md:text-2xl font-medium hover:text-neutral-400 transition-colors"
                                        >
                                            {item}
                                        </Link>
                                    ))}
                                </nav>
                            </div>

                            {/* Follow Column */}
                            <div className="flex flex-col gap-6">
                                <span className="text-sm text-neutral-500 mb-2">Follow</span>
                                <nav className="flex flex-col gap-4">
                                    {['Twitter', 'Instagram', 'Facebook'].map((item) => (
                                        <Link
                                            key={item}
                                            href="#"
                                            className="text-lg md:text-2xl font-medium hover:text-neutral-400 transition-colors"
                                        >
                                            {item}
                                        </Link>
                                    ))}
                                </nav>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </footer>
    );
}
