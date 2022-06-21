// GENERATED VIA NETLIFY AUTOMATED DEV TOOLS, EDIT WITH CAUTION!

export type NetlifyGraphFunctionOptions = {
  /**
   * The accessToken to use for the request
   */
  accessToken?: string;
  /**
   * The siteId to use for the request
   * @default process.env.SITE_ID
   */
  siteId?: string;
}

export type WebhookEvent = {
  body: string;
  headers: Record<string, string | null | undefined>;
};

export type GraphQLError = {
  "path": Array<string | number>,
  "message": string,
  "extensions": Record<string, unknown>
};



export type CommittedDateInput = {
  /**
 * The name of the repository
 */
 "name"?: string;  
 /**
 * The login field of a user or organization
 */
 "owner"?: string;  
 /**
 * If non-null, filters history to only show commits touching files under this path.
 */
 "path"?: string
};

export type CommittedDate = {
  /**
  * Any data from the function will be returned here
  */
data: {
  gitHub: {
  /**
  * Lookup a given repository by the owner and repository name.
  */
repository: {
  /**
  * Fetch a given ref from the repository
  */
ref: {
  /**
  * The object the ref points to. Returns null when object does not exist.
  */
target: ;
};
};
};
};
  /**
  * Any errors from the function will be returned here
  */
errors: Array<GraphQLError>;
};

/**
 * Get committed date of path from repository.
 */
export function fetchCommittedDate(
  variables: CommittedDateInput,
  options?: NetlifyGraphFunctionOptions
): Promise<CommittedDate>;

export type RepoFilesInput = {
  /**
 * The name of the repository
 */
 "name"?: string;  
 /**
 * The login field of a user or organization
 */
 "owner"?: string
};

export type RepoFiles = {
  /**
  * Any data from the function will be returned here
  */
data: {
  gitHub: {
  /**
  * Lookup a given repository by the owner and repository name.
  */
repository: {
  /**
  * A Git object in the repository
  */
object: ;
};
};
};
  /**
  * Any errors from the function will be returned here
  */
errors: Array<GraphQLError>;
};

/**
 * Return list of TIL files.
 */
export function fetchRepoFiles(
  variables: RepoFilesInput,
  options?: NetlifyGraphFunctionOptions
): Promise<RepoFiles>;
