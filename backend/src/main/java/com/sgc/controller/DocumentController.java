@RestController
@RequestMapping("/api/documents")
public class DocumentController {

    @Autowired
    private DocumentService documentService;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadDocument(@RequestParam("file") MultipartFile file) {
        documentService.uploadDocument(file);
        return ResponseEntity.ok("Documento subido exitosamente");
    }

    @GetMapping("/list")
    public ResponseEntity<List<Document>> listDocuments() {
        return ResponseEntity.ok(documentService.listDocuments());
    }

    @GetMapping("/download/{id}")
    public ResponseEntity<Resource> downloadDocument(@PathVariable Long id) {
        Resource resource = documentService.downloadDocument(id);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

    @GetMapping("/reports")
    public ResponseEntity<List<DocumentReportDTO>> getReports(
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate,
            @RequestParam(required = false) Boolean missingOnly) {

        List<DocumentReportDTO> reports = documentService.getFilteredDocuments(startDate, endDate, missingOnly);
        return ResponseEntity.ok(reports);
    }
}
