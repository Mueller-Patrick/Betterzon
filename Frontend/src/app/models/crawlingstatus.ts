export interface CrawlingStatus {
    process_id: number;
    started_timestamp: Date;
    combinations_to_crawl: number;
    successful_crawls: number;
    failed_crawls: number;
}
