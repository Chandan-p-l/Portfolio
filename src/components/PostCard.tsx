import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { formatDate, type Post } from '../lib/blog';
import { sound } from '../utils/sound';
import { FitText } from './FitText';

export function PostCard({ post, index = 0 }: { post: Post; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 3) * 0.1, duration: 0.5 }}
    >
      <Link
        to={`/blog/${post.slug}`}
        onClick={() => sound.playClick()}
        onMouseEnter={() => sound.playHover()}
        data-cursor-text="READ"
        className="group flex h-full flex-col justify-between gap-8 bg-[#0E0E10] border border-white/10 hover:border-[#FF2B2B] p-6 transition-all duration-300 hover:-translate-y-2 shadow-xl"
      >
        <div>
          <div className="flex justify-between font-tech text-[10px] uppercase tracking-widest text-[#FF2B2B] font-bold mb-4">
            <span>{post.tags[0]}</span>
            <span className="text-neutral-500">{post.readingMinutes} MIN READ</span>
          </div>
          <FitText as="h3" text={post.title} max={1.25} className="font-display text-xl font-black uppercase leading-tight text-white group-hover:text-[#FF2B2B] transition-colors">
            {post.title}
          </FitText>
          <p className="mt-3 font-sans text-sm text-neutral-400 leading-relaxed line-clamp-3">{post.description}</p>
        </div>
        <div className="flex items-center justify-between border-t border-white/10 pt-4 font-tech text-[10px] uppercase tracking-widest text-neutral-500">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <ArrowUpRight className="w-4 h-4 text-[#FF2B2B] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </Link>
    </motion.div>
  );
}
