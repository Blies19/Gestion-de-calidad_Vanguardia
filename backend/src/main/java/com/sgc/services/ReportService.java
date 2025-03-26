@Service
public class ReportService {

    @Autowired
    private DocumentRepository documentRepository;

    public List<DocumentReportDTO> getDocumentReport(String startDate, String endDate, Boolean missingOnly) {
        return documentRepository.findDocumentsWithFilters(startDate, endDate, missingOnly);
    }
}
