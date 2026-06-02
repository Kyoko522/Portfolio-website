// A "port" in ports-and-adapters: the resume module depends on this interface,
// not on any concrete way of publishing. That lets us swap LocalGitPublisher
// (writes to the repo + git push, for local/own-server use) for a future
// GitHubApiPublisher (commits via the GitHub API, for off-repo hosting) without
// touching a single line of business logic.
export interface PublishResult {
  pdfPath: string;
  committed: boolean;
  commit?: string;
  message: string;
}

export interface PublishService {
  publish(pdf: Buffer): Promise<PublishResult>;
}
