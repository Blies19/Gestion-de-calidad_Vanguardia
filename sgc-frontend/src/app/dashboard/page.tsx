// src/app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '../../components/ProtectedRoute';
import { getUsuarios, createUsuario, updateUsuario } from '../../lib/api';
import { motion, AnimatePresence } from 'framer-motion';

export default function DashboardPage() {
    const router = useRouter();
    const [usuarios, setUsuarios] = useState([]);
    const [error, setError] = useState('');
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [currentUsuario, setCurrentUsuario] = useState(null);
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        passwordHash: '',
        rol: 'Admin',
    });

    const fetchUsuarios = async () => {
        try {
            const data = await getUsuarios();
            setUsuarios(data);
        } catch (err) {
            setError(err.message || 'Error al cargar usuarios');
            if (err.message.includes('No se encontró el token')) {
                router.push('/auth/login');
            }
        }
    };

    useEffect(() => {
        fetchUsuarios();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleCreateSubmit = async (e) => {
        e.preventDefault();
        try {
            await createUsuario(formData);
            setShowCreateForm(false);
            setFormData({ nombre: '', apellido: '', email: '', passwordHash: '', rol: 'Admin' });
            fetchUsuarios();
        } catch (err) {
            setError(err.message || 'Error al crear usuario');
            if (err.message.includes('No se encontró el token')) {
                router.push('/auth/login');
            }
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUsuario(currentUsuario.id, formData);
            setShowEditForm(false);
            setCurrentUsuario(null);
            setFormData({ nombre: '', apellido: '', email: '', passwordHash: '', rol: 'Admin' });
            fetchUsuarios();
        } catch (err) {
            setError(err.message || 'Error al actualizar usuario');
            if (err.message.includes('No se encontró el token')) {
                router.push('/auth/login');
            }
        }
    };

    const handleEditClick = (usuario) => {
        setCurrentUsuario(usuario);
        setFormData({
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            email: usuario.email,
            passwordHash: '',
            rol: usuario.rol,
        });
        setShowEditForm(true);
    };

    return (
        <ProtectedRoute>
            <div style={styles.container}>
                <h1 style={styles.title}>Dashboard</h1>
                {error && <div className="error">{error}</div>}
                <button onClick={() => setShowCreateForm(true)} style={styles.button}>
                    Crear nuevo usuario
                </button>

                <AnimatePresence>
                    {showCreateForm && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            style={styles.formContainer}
                        >
                            <h2 style={styles.formTitle}>Crear usuario</h2>
                            <form onSubmit={handleCreateSubmit}>
                                <input
                                    type="text"
                                    name="nombre"
                                    placeholder="Nombre"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    type="text"
                                    name="apellido"
                                    placeholder="Apellido"
                                    value={formData.apellido}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    type="password"
                                    name="passwordHash"
                                    placeholder="Contraseña"
                                    value={formData.passwordHash}
                                    onChange={handleChange}
                                    required
                                />
                                <select name="rol" value={formData.rol} onChange={handleChange} required>
                                    <option value="Admin">Admin</option>
                                    <option value="Investigador">Investigador</option>
                                    <option value="Auditor">Auditor</option>
                                </select>
                                <div style={styles.formActions}>
                                    <button type="submit">Crear</button>
                                    <button
                                        type="button"
                                        onClick={() => setShowCreateForm(false)}
                                        style={styles.cancelButton}
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {showEditForm && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            style={styles.formContainer}
                        >
                            <h2 style={styles.formTitle}>Editar usuario</h2>
                            <form onSubmit={handleEditSubmit}>
                                <input
                                    type="text"
                                    name="nombre"
                                    placeholder="Nombre"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    type="text"
                                    name="apellido"
                                    placeholder="Apellido"
                                    value={formData.apellido}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    type="password"
                                    name="passwordHash"
                                    placeholder="Nueva contraseña (opcional)"
                                    value={formData.passwordHash}
                                    onChange={handleChange}
                                />
                                <select name="rol" value={formData.rol} onChange={handleChange} required>
                                    <option value="Admin">Admin</option>
                                    <option value="Investigador">Investigador</option>
                                    <option value="Auditor">Auditor</option>
                                </select>
                                <div style={styles.formActions}>
                                    <button type="submit">Guardar</button>
                                    <button
                                        type="button"
                                        onClick={() => setShowEditForm(false)}
                                        style={styles.cancelButton}
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>

                <h2 style={styles.sectionTitle}>Lista de Usuarios</h2>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Nombre</th>
                            <th style={styles.th}>Apellido</th>
                            <th style={styles.th}>Email</th>
                            <th style={styles.th}>Rol</th>
                            <th style={styles.th}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((usuario) => (
                            <tr key={usuario.id}>
                                <td style={styles.td}>{usuario.nombre}</td>
                                <td style={styles.td}>{usuario.apellido}</td>
                                <td style={styles.td}>{usuario.email}</td>
                                <td style={styles.td}>{usuario.rol}</td>
                                <td style={styles.td}>
                                    <button
                                        onClick={() => handleEditClick(usuario)}
                                        style={styles.editButton}
                                    >
                                        Editar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </ProtectedRoute>
    );
}

const styles = {
    container: {
        padding: '40px 20px',
        maxWidth: '1200px',
        margin: '0 auto',
    },
    title: {
        fontSize: '32px',
        fontWeight: '600',
        marginBottom: '20px',
        color: 'var(--text)',
    },
    sectionTitle: {
        fontSize: '24px',
        fontWeight: '500',
        marginBottom: '20px',
        color: 'var(--text)',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: 'var(--primary)',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        marginBottom: '30px',
        transition: 'background-color 0.3s',
        fontWeight: '500',
    },
    formContainer: {
        background: 'var(--card-background)',
        padding: '25px',
        borderRadius: '8px',
        boxShadow: 'var(--shadow)',
        marginBottom: '30px',
    },
    formTitle: {
        fontSize: '20px',
        fontWeight: '500',
        marginBottom: '20px',
        color: 'var(--text)',
    },
    formActions: {
        display: 'flex',
        gap: '10px',
        marginTop: '20px',
    },
    cancelButton: {
        padding: '10px 20px',
        backgroundColor: 'var(--danger)',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: '500',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        background: 'var(--card-background)',
        boxShadow: 'var(--shadow)',
        borderRadius: '8px',
        overflow: 'hidden',
    },
    th: {
        padding: '15px',
        backgroundColor: 'var(--primary)',
        color: 'white',
        textAlign: 'left',
        fontWeight: '500',
    },
    td: {
        padding: '15px',
        borderBottom: '1px solid var(--border)',
        color: 'var(--text)',
    },
    editButton: {
        padding: '6px 12px',
        backgroundColor: 'var(--success)',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        fontWeight: '500',
    },
};