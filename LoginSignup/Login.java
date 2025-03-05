import javax.swing.*;
import java.awt.*;

public class Login extends JFrame {
    private JTextField txtCorreo;
    private JPasswordField txtContraseña;

    public Login() {
        setTitle("Login - Tienda Deportiva");
        setSize(400, 300);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);
        setLayout(new GridBagLayout());

        GridBagConstraints gbc = new GridBagConstraints();
        gbc.insets = new Insets(5, 5, 5, 5);
        gbc.fill = GridBagConstraints.HORIZONTAL;

        // Etiqueta y campo de Correo
        gbc.gridx = 0;
        gbc.gridy = 0;
        add(new JLabel("Correo:"), gbc);

        gbc.gridx = 1;
        txtCorreo = new JTextField(15);
        add(txtCorreo, gbc);

        // Etiqueta y campo de Contraseña
        gbc.gridx = 0;
        gbc.gridy = 1;
        add(new JLabel("Contraseña:"), gbc);

        gbc.gridx = 1;
        txtContraseña = new JPasswordField(15);
        add(txtContraseña, gbc);

        // Botón Ingresar
        gbc.gridx = 0;
        gbc.gridy = 2;
        JButton btnLogin = new JButton("Ingresar");
        add(btnLogin, gbc);

        // Botón Salir
        gbc.gridx = 1;
        gbc.gridy = 2;
        JButton btnSalir = new JButton("Salir");
        add(btnSalir, gbc);

        // Botón Registrarse (Abajo)
        gbc.gridx = 0;
        gbc.gridy = 3;
        gbc.gridwidth = 2; // Ocupa dos columnas
        JButton btnRegistrarse = new JButton("Registrarse");
        add(btnRegistrarse, gbc);

        btnSalir.addActionListener(e -> System.exit(0));

        btnRegistrarse.addActionListener(e -> {
            new Signup().setVisible(true); // Abre la ventana de registro
            dispose(); // Cierra la ventana de login
        });
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> new Login().setVisible(true));
    }
}

// ----------------- Ventana de Registro -----------------
class Signup extends JFrame {
    private JTextField txtNombre, txtCorreo;
    private JPasswordField txtContraseña;

    public Signup() {
        setTitle("Registro - Tienda Deportiva");
        setSize(400, 300);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);
        setLayout(new GridBagLayout());

        GridBagConstraints gbc = new GridBagConstraints();
        gbc.insets = new Insets(5, 5, 5, 5);
        gbc.fill = GridBagConstraints.HORIZONTAL;

        // Etiqueta y campo de Nombre
        gbc.gridx = 0;
        gbc.gridy = 0;
        add(new JLabel("Nombre:"), gbc);

        gbc.gridx = 1;
        txtNombre = new JTextField(15);
        add(txtNombre, gbc);

        // Etiqueta y campo de Correo
        gbc.gridx = 0;
        gbc.gridy = 1;
        add(new JLabel("Correo:"), gbc);

        gbc.gridx = 1;
        txtCorreo = new JTextField(15);
        add(txtCorreo, gbc);

        // Etiqueta y campo de Contraseña
        gbc.gridx = 0;
        gbc.gridy = 2;
        add(new JLabel("Contraseña:"), gbc);

        gbc.gridx = 1;
        txtContraseña = new JPasswordField(15);
        add(txtContraseña, gbc);

        // Botón Registrarse
        gbc.gridx = 0;
        gbc.gridy = 3;
        JButton btnRegistrar = new JButton("Registrar");
        add(btnRegistrar, gbc);

        // Botón Volver al Login
        gbc.gridx = 1;
        gbc.gridy = 3;
        JButton btnVolver = new JButton("Volver");
        add(btnVolver, gbc);

        btnVolver.addActionListener(e -> {
            new Login().setVisible(true); // Abre el login
            dispose(); // Cierra la ventana de registro
        });
    }
}
