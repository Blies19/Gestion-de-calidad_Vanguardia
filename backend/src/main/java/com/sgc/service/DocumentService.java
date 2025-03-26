@Service
public class DocumentService {

    @Autowired
    private DocumentRepository documentRepository;

    public void uploadDocument(MultipartFile file) {
        // Lógica para guardar el archivo en el sistema de archivos o en la nube.
    }

    public List<Document> listDocuments() {
        return documentRepository.findAll();
    }

    public Resource downloadDocument(Long id) {
        // Lógica para descargar el archivo.
    }
}