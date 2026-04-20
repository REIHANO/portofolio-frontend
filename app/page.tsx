"use client";
import { useEffect, useState } from 'react';

// ✅ Type definitions — fix semua error ts(2339)
interface Hero {
  badge: string;
  headline: string;
  subheadline: string;
  cta_link: string;
  cta_text: string;
  image_url: string;
}

interface About {
  id: number;
  description: string;
}

interface Contact {
  email: string;
}

interface Social {
  id: number;
  platform: string;
  url: string;
}

interface Expertise {
  id: number;
  name: string;
}

interface Tool {
  id: number;
  name: string;
}

interface Experience {
  id: number;
  position: string;      
  company_name: string;  
  location: string;
  start_year: string;
  end_year: string | null;
  description: string;
}

interface Project {
  id: number;
  title: string;
  year: string;
  image_url: string;
  category: string;
  description: string;
}

interface Portfolio {
  hero: Hero | null;
  about: About | null;
  contact: Contact | null;
  socials: Social[];
  expertises: Expertise[];
  tools: Tool[];
  experiences: Experience[];
  projects: Project[];
}

export default function Home() {
  const [portfolio, setPortfolio] = useState<Portfolio>({
    hero: null,
    about: null,
    contact: null,
    socials: [],
    expertises: [],
    tools: [],
    experiences: [],
    projects: []
  });
  const [loading, setLoading] = useState(true);

  const API_BASE = 'http://127.0.0.1:8000';

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const endpoints = [
          '/api/heros',
          '/api/abouts',
          '/api/contacts',
          '/api/socials',
          '/api/expertises',
          '/api/tools',
          '/api/experiences',
          '/api/projects'
        ];

        const [hero, about, contact, social, expertise, tool, experience, project] = await Promise.all(
          endpoints.map(path => fetch(`${API_BASE}${path}`).then(res => res.json()))
        );

        setPortfolio({
          hero: hero.data[0],
          about: about.data.find((a: About) => a.id === 2), 
          contact: contact.data[0],
          socials: social.data,
          expertises: expertise.data,
          tools: tool.data,
          experiences: experience.data,
          projects: project.data
        });
      } catch (error) {
        console.error("Gagal mengambil data portofolio:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  if (loading) return <div className="h-screen flex items-center justify-center">Loading Data...</div>;

  return (
    <div className="scroll-smooth bg-white text-slate-900">

      {/* HERO SECTION */}
     <section id="home" className="min-h-[80vh] flex items-center px-6 pt-16 bg-white">
  <div className="container mx-auto grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
    
    {/* SISI KIRI: TEKS (Diperkecil) */}
    <div className="order-2 md:order-1 text-center md:text-left">
      <div className="mb-4">
        <span className="inline-block bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em]">
          {portfolio.hero?.badge}
        </span>
      </div>

      {/* Font Size diturunkan dari text-8xl ke text-6xl agar pixel tidak terlalu besar */}
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight text-slate-900 mb-6">
        Siswa RPL & <br /> 
        Web Developer <br />
        <span className="text-blue-600">Membangun <br /> Masa Depan Digital </span> 
      </h1>

      <p className="text-base md:text-lg text-slate-500 max-w-sm mb-8 leading-relaxed mx-auto md:mx-0">
        {portfolio.hero?.subheadline}
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
        <a 
          href={portfolio.hero?.cta_link} 
          className="bg-blue-600 text-white px-8 py-3.5 rounded-xl font-bold text-base hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
        >
          {portfolio.hero?.cta_text}
        </a>
      </div>
    </div>
    
    {/* SISI KANAN: GAMBAR (Dibatasi ukurannya) */}
    <div className="order-1 md:order-2 flex justify-center md:justify-end">
      <div className="relative group">
        <div className="absolute -inset-4 bg-blue-100 rounded-[40px] rotate-3 group-hover:rotate-0 transition-transform duration-500"></div>
        
        {/* Ukuran maksimal gambar dibatasi (max-w-[350px]) agar tidak pecah atau terlalu besar */}
        <img 
          src={`${API_BASE}/${portfolio.hero?.image_url}`} 
          alt="Profile" 
          className="relative w-full max-w-[320px] lg:max-w-[380px] aspect-square object-cover rounded-[35px] shadow-xl border-[3px] border-white"
        />
      </div>
    </div>

  </div>
</section>
      {/* ABOUT, EXPERTISE & TOOLS */}
      <section id="about" className="py-32 bg-slate-50 px-6 border-y border-slate-100">
  <div className="container mx-auto">
    <div className="grid md:grid-cols-12 gap-16 items-start">
      
      {/* Kolom Kiri: Deskripsi Utama (Lebar 8 Kolom) */}
      <div className="md:col-span-8">
        <h2 className="text-3xl md:text-5xl font-medium leading-[1.2] text-slate-800 tracking-tight mb-20">
          {portfolio.about?.description || "Memuat deskripsi..."}
        </h2>
      </div>
      <div className="hidden md:block md:col-span-4"></div>
      <div className="md:col-span-12 grid md:grid-cols-12 gap-12 mt-10">
        {/* EXPERTISE */}
        <div className="md:col-span-4 lg:col-span-3">
          <h4 className="text-slate-400 uppercase text-xs font-bold tracking-[0.2em] mb-8">
            Expertise
          </h4>
          <ul className="space-y-4 font-medium text-slate-700 text-lg">
            {portfolio.expertises.map((e: Expertise) => (
              <li key={e.id} className="transition-all hover:text-blue-600 cursor-default">
                {e.name}
              </li>
            ))}
          </ul>
        </div>
        {/* TOOLS */}
        <div className="md:col-span-4 lg:col-span-3">
          <h4 className="text-slate-400 uppercase text-xs font-bold tracking-[0.2em] mb-8">
            Tools
          </h4>
          <ul className="space-y-4 font-medium text-slate-700 text-lg">
            {portfolio.tools.map((t: Tool) => (
              <li key={t.id} className="transition-all hover:text-blue-600 cursor-default">
                {t.name}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  </div>
</section>

      {/* EXPERIENCE SECTION */}
     <section className="py-24 px-6 bg-white">
  <div className="container mx-auto">
    <h2 className="text-4xl font-extrabold mb-16 tracking-tight text-slate-900 font-sans">Career Journey</h2>
    <div className="flex flex-col">
      {portfolio.experiences.map((exp: Experience) => (
        <div key={exp.id} className="group border-t border-slate-100 py-12 flex flex-col md:grid md:grid-cols-12 gap-8 hover:bg-slate-50/50 transition-all duration-300 px-6 rounded-2xl">
          
          {/* SISI KIRI: Posisi & Nama Instansi */}
          <div className="md:col-span-4">
            <span className="text-blue-600 font-mono text-sm mb-2 block tracking-widest uppercase">
              {exp.start_year} — {exp.end_year || 'Present'}
            </span>
            <h3 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition">
              {exp.position} {/* ✅ Menggunakan 'position' */}
            </h3>
            <p className="text-slate-500 font-medium mt-1 text-lg">
              {exp.company_name} {/* ✅ Menggunakan 'company_name' */}
            </p>
            <p className="text-slate-400 text-sm mt-2 flex items-center gap-2">
               📍 {exp.location}
            </p>
          </div>

          {/* SISI KANAN: Deskripsi Tugas */}
          <div className="md:col-span-8">
            <p className="text-slate-600 text-lg leading-relaxed max-w-2xl border-l-2 border-slate-100 pl-8 md:mt-6">
              {exp.description}
            </p>
          </div>

        </div>
      ))}
    </div>
  </div>
</section>

      {/* PROJECTS/PRODUCTS SECTION */}
      <section id="projects" className="py-24 bg-slate-50 px-6 border-t border-slate-100">
  <div className="container mx-auto">
    <h2 className="text-4xl font-extrabold mb-16 tracking-tight text-slate-900">Karya Terbaru</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {portfolio.projects.map((proj: Project) => (
        <div key={proj.id} className="group bg-white rounded-[40px] overflow-hidden shadow-sm border border-slate-100 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
          {/* ✅ Menampilkan Gambar Project dari Laravel */}
          <div className="relative h-64 overflow-hidden">
            <img 
              src={`${API_BASE}/${proj.image_url}`} 
              alt={proj.title}
              className="w-full h-full object-contain transition duration-500 group-hover:scale-110"
            />
            <div className="absolute top-4 left-4">
              <span className="bg-white/90 backdrop-blur-md text-slate-900 px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-widest">
                {proj.category}
              </span>
            </div>
          </div>

          <div className="p-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-blue-600 font-mono text-sm">{proj.year}</span>
            </div>
            <h3 className="font-extrabold text-2xl mb-4 text-slate-900 group-hover:text-blue-600 transition">
              {proj.title}
            </h3>
            <p className="text-slate-600 leading-relaxed text-base line-clamp-3">
              {proj.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* CONTACT & SOCIALS */}
      <footer id="contact" className="py-20 text-center">
        <h2 className="text-4xl font-black mb-6">Contact Me</h2>
        <a href={`mailto:${portfolio.contact?.email}`} className="text-3xl text-blue-600 underline">
          {portfolio.contact?.email}
        </a>
        <div className="flex justify-center gap-8 mt-12">
          {portfolio.socials.map((social: Social) => (
            <a key={social.id} href={social.url} className="text-slate-400 hover:text-blue-600">
              {social.platform}
            </a>
          ))}
        </div>
      </footer>

    </div>
  );
}
