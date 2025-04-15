// src/components/Footer.tsx
export default function Footer() {
    return (
        <footer style={styles.footer}>
            <p>© 2025 SkywardServices. Todos los derechos reservados.</p>
            <div style={styles.links}>
                <a href="/about" style={styles.link}>Acerca de</a>
                <a href="/contact" style={styles.link}>Contacto</a>
            </div>
        </footer>
    );
}

const styles = {
    footer: {
        backgroundColor: 'var(--footer-bg)',
        color: 'white',
        padding: '20px',
        textAlign: 'center',
        marginTop: 'auto',
    },
    links: {
        marginTop: '10px',
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
    },
    link: {
        color: 'white',
        textDecoration: 'none',
        fontSize: '14px',
        transition: 'color 0.3s',
    },
};