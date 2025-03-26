@RestController
@RequestMapping("/api/reports")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @GetMapping("/documents")
    public ResponseEntity<List<DocumentReportDTO>> getDocumentsReport(
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate,
            @RequestParam(required = false) Boolean missingOnly) {

        List<DocumentReportDTO> report = reportService.getDocumentReport(startDate, endDate, missingOnly);
        return ResponseEntity.ok(report);
    }
}
