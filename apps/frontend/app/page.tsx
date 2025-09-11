
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main} role="main" aria-label="Home content" style={{paddingTop: 32, paddingBottom: 32}}>
        <section style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 48,
          flexWrap: 'wrap',
          width: '100%'
        }}>
          <div style={{maxWidth: 480, flex: 1, minWidth: 280}}>
            <h1 style={{fontSize: 44, fontWeight: 800, marginBottom: 16, lineHeight: 1.1}}>
              Supercharge your productivity with <span style={{color: '#2563eb'}}>TaskAura.ai</span>
            </h1>
            <p style={{fontSize: 20, color: '#444', marginBottom: 32, fontWeight: 500}}>
              Your AI-powered assistant for tasks, chat, and smart summaries. Collaborate, organize, and achieve more—effortlessly.
            </p>
            <div style={{display: 'flex', gap: 16, marginBottom: 24}}>
              <a
                className={styles.primary + " focus:outline-none focus:ring-2 focus:ring-blue-500"}
                href="/register"
                aria-label="Sign up for TaskAura.ai"
                style={{fontSize: 18, padding: '12px 32px', borderRadius: 32, fontWeight: 700, background: '#2563eb', color: '#fff', boxShadow: '0 2px 8px rgba(37,99,235,0.08)'}}
              >
                Get Started
              </a>
              <a
                className={styles.secondary + " focus:outline-none focus:ring-2 focus:ring-blue-500"}
                href="/login"
                aria-label="Login to TaskAura.ai"
                style={{fontSize: 18, padding: '12px 32px', borderRadius: 32, fontWeight: 700, border: '1.5px solid #2563eb', color: '#2563eb', background: '#fff'}}
              >
                Login
              </a>
            </div>
            <ul style={{fontSize: 17, color: '#333', marginLeft: 0, paddingLeft: 0, listStyle: 'none', marginBottom: 0}}>
              <li style={{marginBottom: 8}}>✅ Real-time task management</li>
              <li style={{marginBottom: 8}}>💬 AI chat and smart summaries</li>
              <li style={{marginBottom: 8}}>🤝 Workspace collaboration</li>
              <li>📱 Accessible from any device</li>
            </ul>
          </div>
          <div style={{flex: 1, minWidth: 260, display: 'flex', justifyContent: 'center'}}>
            <Image
              src="/globe.svg"
              alt="Productivity illustration"
              width={340}
              height={340}
              priority
              style={{maxWidth: '100%', height: 'auto', borderRadius: 24, boxShadow: '0 4px 32px rgba(37,99,235,0.08)'}}
            />
          </div>
        </section>
      </main>
      <footer className={styles.footer} role="contentinfo" aria-label="Footer">
        <span>© {new Date().getFullYear()} TaskAura.ai</span>
      </footer>
    </div>
  );
}
