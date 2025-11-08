// components/OurImpact.jsx
'use client';
import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const OurImpact = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Parallax transforms
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  const stats = [
    {
      number: 3500,
      suffix: '+',
      label: 'Students Supported',
      icon: '👨‍🎓',
      color: 'from-blue-500 to-cyan-600',
      delay: 0
    },
    {
      number: 52,
      suffix: '',
      label: 'Schools Partnered',
      icon: '🏫',
      color: 'from-cyan-500 to-blue-600',
      delay: 0.1
    },
    {
      number: 96,
      suffix: '%',
      label: 'Completion Rate',
      icon: '📈',
      color: 'from-blue-600 to-indigo-600',
      delay: 0.2
    },
    {
      number: 28,
      suffix: '',
      label: 'Communities',
      icon: '🌍',
      color: 'from-indigo-500 to-purple-600',
      delay: 0.3
    }
  ];

  const Counter = ({ target, suffix, duration = 2 }) => {
    const [count, setCount] = useState(0);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    useEffect(() => {
      if (!isInView) return;

      let start = 0;
      const endTime = Date.now() + duration * 1000;
      const updateCount = () => {
        const now = Date.now();
        const progress = Math.min((endTime - now) / (duration * 1000), 1);
        const current = target * (1 - progress);

        setCount(Math.floor(current));

        if (progress > 0) {
          requestAnimationFrame(updateCount);
        }
      };
      updateCount();
    }, [target, duration, isInView]);

    return (
      <motion.div
        className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-3 tracking-tight"
        style={{ filter: `drop-shadow(0 2px 4px rgba(0,0,0,0.3))` }}
      >
        {count.toLocaleString()}{suffix}
      </motion.div>
    );
  };

  const StatCard = ({ stat, index }) => {
    const cardRef = useRef(null);
    const cardY = useTransform(scrollYProgress, [0, 1], [0, -index * 10]);

    return (
      <motion.div
        ref={cardRef}
        style={{
          y: cardY,
          rotateX: useTransform(scrollYProgress, [0, 1], [0, -5]),
          scale: useTransform(scrollYProgress, [0, 0.5], [0.95, 1])
        }}
        className="relative bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-4 sm:p-6 flex flex-col items-center text-center shadow-2xl hover:shadow-3xl transition-all duration-700 group cursor-pointer overflow-hidden"
        whileHover={{
          scale: 1.05,
          rotateY: 2,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute w-full h-full opacity-20"
            style={{
              background: `radial-gradient(circle at 30% 30%, ${stat.color.replace('from-', '').replace('to-', '')}, transparent)`,
              scale: scale
            }}
            animate={{
              backgroundPosition: ["left top", "right bottom", "left bottom"],
            }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
          />
          <div className="absolute inset-0 bg-gradient-to-br opacity-10 animate-pulse" />
        </div>

        {/* Floating Particles */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              top: `${20 + i * 30}%`,
              left: `${10 + i * 40}%`,
              scale: useTransform(scrollYProgress, [0, 1], [0.5, 1.5])
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{ duration: 3 + i, repeat: Infinity }}
          />
        ))}

        {/* Icon */}
        <motion.div
          className="text-3xl sm:text-4xl mb-3 relative z-10"
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, delay: stat.delay }}
          style={{ filter: `drop-shadow(0 2px 8px rgba(0,0,0,0.3))` }}
        >
          {stat.icon}
        </motion.div>

        {/* Counter */}
        <Counter target={stat.number} suffix={stat.suffix} />

        {/* Label */}
        <motion.p
          className="text-white/95 text-xs sm:text-sm lg:text-base font-semibold mt-2 px-2 relative z-10 tracking-wide"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: stat.delay + 0.3 }}
          style={{ textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}
        >
          {stat.label}
        </motion.p>

        {/* Glow Effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/5 via-white/2 to-transparent opacity-0 group-hover:opacity-100"
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
        />
      </motion.div>
    );
  };

  return (
    <section
      ref={ref}
      className="relative min-h-[60vh] sm:min-h-[70vh] py-12 sm:py-16 lg:py-20 overflow-hidden"
      style={{
        background: `
          linear-gradient(135deg, 
            #2563eb 0%, 
            #1d4ed8 25%, 
            #7c3aed 50%, 
            #06b6d4 75%, 
            #3b82f6 100%
          ),
          radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(147,51,234,0.15) 0%, transparent 50%)
        `,
        backgroundSize: '400% 400%, cover, cover',
        backgroundPosition: '0% 50%'
      }}
    >
      {/* Enhanced Parallax Background */}
      <motion.div
        className="absolute inset-0"
        style={{ y: y1, scale: useTransform(scrollYProgress, [0, 1], [1, 1.1]) }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
      />

      {/* Parallax Layers */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/5 to-transparent"
        style={{ y: y2 }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/10 to-transparent"
        style={{ y: y3 }}
      />

      {/* Floating Elements */}
      <motion.div
        className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"
        style={{ y: y1, scale: scale }}
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-20 right-20 w-16 h-16 border border-white/20 rounded-full"
        style={{ y: y2 }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 left-1/4 w-12 h-12 bg-gradient-to-r from-purple-400/20 to-transparent rounded-full"
        style={{ y: y3, x: useTransform(scrollYProgress, [0, 1], ["0%", "20%"]) }}
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact Header */}
        <motion.div
          className="text-center mb-10 sm:mb-12"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 tracking-tight"
            style={{ textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}
          >
            Our Impact
          </motion.h2>
          <motion.p
            className="text-blue-100 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Transforming lives through education, one student at a time
          </motion.p>
        </motion.div>

        {/* Compact Stats Grid */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurImpact;