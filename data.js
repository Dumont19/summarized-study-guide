/* ═══════════════════════════════════════════════
   SNOWPRO CORE COF-C03 · STUDY HUB
   data.js  —  Study content + exam questions
   ═══════════════════════════════════════════════ */

/* ─────────────────────────────────────────────
   DOMAINS  (study guide content)
   ───────────────────────────────────────────── */
const DOMAINS = [
  {
    id: 'd1',
    code: 'Domain 1',
    weight: '31%',
    title: 'AI Data Cloud Features & Architecture',
    subdomains: [
      {
        name: 'Snowflake Architecture',
        items: [
          'Cloud Services layer (Query parsing, optimizer, metadata, auth)',
          'Compute layer (Virtual Warehouses — elastic, isolated)',
          'Database Storage layer (micro-partitions, columnar, compressed)',
          'Editions: Standard, Enterprise, Business Critical, VPS',
        ],
      },
      {
        name: 'Interfaces & Tools',
        items: [
          'Snowsight (web UI)',
          'Snowflake CLI',
          'IDE integrations (VS Code extension)',
          'SnowSQL (legacy CLI)',
          'Snowpark (multi-language DataFrame API)',
          'Streamlit in Snowflake (web apps)',
        ],
      },
      {
        name: 'Object Hierarchy',
        items: [
          'Organization → Account → Database → Schema → Object',
          'Object types: Tables, Views, Stages, Pipes, Streams, Tasks, UDFs, Stored Procs, Sequences, ML Models, Applications',
        ],
      },
      {
        name: 'Virtual Warehouses',
        items: [
          'Standard (Gen 1 & Gen 2)',
          'Snowpark Optimized (ML workloads, more RAM)',
          'Sizes: XS to 6XL (doubles credits per size up)',
          'Multi-cluster warehouses: min/max clusters, scaling modes (Maximized / Economy)',
          'Auto-suspend & Auto-resume',
          'Scaling UP vs. Scaling OUT',
        ],
      },
      {
        name: 'Storage Concepts',
        items: [
          'Micro-partitions: 50–500MB uncompressed, columnar, metadata-rich',
          'Data clustering: natural vs. explicit clustering keys',
          'Table types: Permanent, Temporary, Transient, External, Dynamic, Apache Iceberg™',
          'View types: Standard, Materialized, Secure',
        ],
      },
      {
        name: 'AI/ML Features',
        items: [
          'Snowflake Cortex: LLM-powered AI SQL functions (COMPLETE, CLASSIFY, EXTRACT_ANSWER, SENTIMENT, SUMMARIZE, TRANSLATE)',
          'Cortex Search: full-text & semantic search engine',
          'Cortex Analyst: natural-language analytics over structured data',
          'Snowflake ML: AutoML classification, forecasting, anomaly detection',
          'Snowflake Notebooks: interactive Jupyter-style notebooks',
          'Snowpark: Python/Java/Scala DataFrames inside Snowflake',
        ],
      },
    ],
    summary: `Snowflake's architecture is the foundation of every COF-C03 exam question. It separates storage, compute, and cloud services into **three distinct layers** that scale independently. The **Cloud Services layer** handles authentication, query optimization, metadata management, and transaction coordination — it runs automatically and costs credits only when usage exceeds 10% of compute credits. The **Compute layer** consists of Virtual Warehouses: isolated clusters that don't share compute resources, enabling true multi-workload concurrency without contention. The **Storage layer** uses proprietary micro-partitions (50–500 MB uncompressed, columnar, compressed with automatic metadata) that enable powerful pruning.

**COF-C03's biggest addition is Domain 1.6: AI/ML features.** Snowflake Cortex exposes LLMs (Mixtral, Llama, Mistral) via simple SQL functions. \`SNOWFLAKE.CORTEX.COMPLETE(model, prompt)\` generates text. \`SENTIMENT()\`, \`TRANSLATE()\`, \`SUMMARIZE()\`, \`CLASSIFY_TEXT()\`, and \`EXTRACT_ANSWER()\` handle NLP tasks without data ever leaving Snowflake. Cortex Search builds hybrid vector+keyword indexes on your data for RAG applications. Cortex Analyst interprets natural-language questions about structured tables.

**Snowpark** lets engineers write Python, Java, or Scala code that executes directly inside Snowflake's compute — no data movement. Snowpark Optimized Warehouses provide extra CPU and RAM for intensive ML workloads. Snowflake Notebooks are interactive development environments that combine SQL, Python, and Markdown in a single interface with Snowflake security context.

Virtual Warehouses now include **Standard Gen 2** (faster cold start, higher concurrency per credit) and **Snowpark Optimized** types. Multi-cluster warehouses scale horizontally by spawning additional warehouse instances when queueing is detected — Maximized mode keeps all clusters active; Economy mode starts clusters only when load warrants it.`,
    topics: [
      'Micro-partitions', 'Cloud Services Layer', 'Virtual Warehouses',
      'Snowflake Cortex', 'Snowpark', 'Multi-cluster Warehouses',
      'Cortex Search', 'Snowflake ML', 'Table Types', 'Materialized Views',
    ],
    tips: [
      { text: '<strong>Architecture layers are independently scalable.</strong> A critical exam concept: stopping a warehouse doesn\'t affect storage, and querying doesn\'t move data out of storage.' },
      { text: '<strong>Snowpark Optimized</strong> warehouses are the RIGHT answer when questions ask about large ML model training, ML feature engineering, or heavy Python workloads needing more memory.' },
      { text: '<strong>Cortex functions are SQL-native.</strong> You call them like any Snowflake function: <code>SELECT SNOWFLAKE.CORTEX.SENTIMENT(review_text) FROM reviews;</code> — no external API keys needed.' },
      { text: '<strong>Edition trap:</strong> Time Travel for 90 days requires Enterprise+. Business Critical adds HIPAA/PCI compliance. VPS is single-tenant. Standard only gets 1 day of Time Travel.' },
      { text: '<strong>Dynamic tables</strong> (COF-C03 addition) are declarative: you define a query and Snowflake handles incremental refresh automatically — think "materialized views with built-in CDC."' },
    ],
  },

  {
    id: 'd2',
    code: 'Domain 2',
    weight: '20%',
    title: 'Account Management & Data Governance',
    subdomains: [
      {
        name: 'Security & Authentication',
        items: [
          'RBAC: Role-Based Access Control',
          'DAC: Discretionary Access Control (object owners grant privileges)',
          'MFA enforcement, SSO, OAuth, Key-pair auth, Federated auth',
          'System roles: ACCOUNTADMIN, SYSADMIN, SECURITYADMIN, USERADMIN, PUBLIC',
          'Secondary roles: allow users to activate multiple roles simultaneously',
          'Network policies: IP allowlists/blocklists',
        ],
      },
      {
        name: 'Roles & Privileges',
        items: [
          'GRANT PRIVILEGE ON OBJECT TO ROLE',
          'Role hierarchy: lower roles can\'t manage higher roles',
          'Account roles vs Database roles (scoped to one database)',
          'Functional roles pattern (team-based)',
          'Custom roles: always best practice vs. using ACCOUNTADMIN directly',
        ],
      },
      {
        name: 'Data Governance',
        items: [
          'Column-level security: Dynamic Data Masking policies',
          'Row-level security: Row Access Policies',
          'Object Tagging: business metadata on any Snowflake object',
          'Privacy Policies (COF-C03 new)',
          'Trust Center: centralized security posture dashboard',
          'Data Lineage (COF-C03 new): track data origin and transformation',
          'Data Replication and Failover',
        ],
      },
      {
        name: 'Cost & Monitoring',
        items: [
          'Resource Monitors: credit quotas per warehouse or account',
          'ACCOUNT_USAGE schema: lag up to 3 hours, 1 year retention',
          'INFORMATION_SCHEMA: real-time, 7-day retention',
          'Calculating credit usage: warehouse size × hours × credit rate',
          'Snowflake Budgets service: spend alerts and forecasting',
          'Cost center tagging for attribution',
        ],
      },
    ],
    summary: `Security in Snowflake uses a **dual model**: RBAC governs who can access which objects (via roles and grants), while DAC means object owners automatically hold all privileges on their objects and can grant them to others. The privilege chain runs: object → role → user, and higher system roles cannot be granted by lower roles.

**COF-C03 introduces Secondary Roles** — a major new exam topic. By default, only the PRIMARY role's privileges are active in a session. With \`USE SECONDARY ROLES ALL\`, a user can activate all roles they're granted simultaneously, simplifying access without constant role-switching.

**Data governance now includes Privacy Policies and Data Lineage.** Privacy Policies define how sensitive data categories should be handled. Data Lineage tracks the transformation chain of columns across tables and views, providing audit trails for compliance. The **Trust Center** (new) is a centralized dashboard showing security posture, misconfigurations, and compliance status across the account.

Dynamic Data Masking applies masking policies to columns — the actual data is hidden or transformed at query time based on the querying role. Row Access Policies filter rows based on the querying role or session context, enforcing row-level security declaratively without modifying the base table.

**For cost management**, Resource Monitors set credit limits (per warehouse or account) and trigger notifications or warehouse suspension. The \`SNOWFLAKE.ACCOUNT_USAGE\` schema is the primary source for historical analysis (up to 1 year, ~3-hour lag). \`INFORMATION_SCHEMA\` is real-time but only retains 7 days. The new Snowflake Budgets service allows proactive spend forecasting and alerting.`,
    topics: [
      'RBAC', 'DAC', 'Secondary Roles', 'Dynamic Data Masking',
      'Row Access Policies', 'Resource Monitors', 'ACCOUNT_USAGE',
      'Trust Center', 'Data Lineage', 'Privacy Policies',
    ],
    tips: [
      { text: '<strong>ACCOUNTADMIN</strong> should never be used for day-to-day operations. The exam will ask about best practices — always choose a custom role or SYSADMIN.' },
      { text: '<strong>Secondary Roles (COF-C03 new):</strong> <code>USE SECONDARY ROLES ALL;</code> activates all granted roles. This is a new, heavily-tested topic that didn\'t exist in COF-C02.' },
      { text: '<strong>ACCOUNT_USAGE vs INFORMATION_SCHEMA:</strong> ACCOUNT_USAGE = historical (3h lag, 1yr), INFORMATION_SCHEMA = real-time (7 days). Exam loves this distinction.' },
      { text: '<strong>Masking policies are attached to columns</strong>, not tables. A role that owns the masking policy can see unmasked data; others see the masked version — all at query time.' },
      { text: '<strong>Resource Monitors only monitor Virtual Warehouses</strong> (not Snowpipe, Automatic Clustering, or Materialized View maintenance). Snowflake Budgets covers the full account.' },
    ],
  },

  {
    id: 'd3',
    code: 'Domain 3',
    weight: '18%',
    title: 'Data Loading, Unloading & Connectivity',
    subdomains: [
      {
        name: 'Stages & File Formats',
        items: [
          'User stage (@~), table stage (@%table), named internal stage (@stage_name)',
          'External stages: S3, Azure Blob, GCS (with storage integration)',
          'File formats: CSV, JSON, AVRO, ORC, PARQUET, XML',
          'Directory tables: list files in stage with metadata',
          'Server-side encryption for stages',
          'COPY INTO: bulk load with transformation and error handling',
        ],
      },
      {
        name: 'Loading Commands',
        items: [
          'PUT: upload local files to internal stage',
          'COPY INTO <table>: load from stage to table',
          'VALIDATE: test COPY without loading',
          'CREATE EXTERNAL TABLE: query files in stage as table',
          'Error handling: ABORT_STATEMENT, CONTINUE, SKIP_FILE',
        ],
      },
      {
        name: 'Automated Ingestion',
        items: [
          'Snowpipe: event-driven micro-batch loading (SQS/SNS/GCS triggers)',
          'Snowpipe Streaming: row-level streaming with Kafka connector',
          'Streams: CDC (Change Data Capture) on tables/views/external tables',
          'Tasks: scheduled or dependency-triggered SQL execution',
          'Dynamic Tables: declarative continuous transformation (refresh lag defined)',
        ],
      },
      {
        name: 'Connectors & Integrations',
        items: [
          'JDBC/ODBC drivers',
          'Python, Spark, Node.js connectors',
          'Snowflake Connector for Kafka',
          'Storage Integrations: secure cloud storage access without credentials',
          'API Integrations: call external REST APIs from UDFs',
          'Git Integration (COF-C03 new): sync repos into Snowflake stages for CI/CD',
        ],
      },
    ],
    summary: `Data loading in Snowflake revolves around **stages** — landing zones for files before they enter tables. The three internal stage types (user, table, named) and external stages (S3/Azure/GCS with storage integrations) form the backbone of all bulk loading operations. The **COPY INTO** command is the primary bulk loading mechanism: it's idempotent (tracks loaded files to prevent duplicates by default), supports transformation during load, and allows error skipping or aborting.

**Snowpipe vs. Snowpipe Streaming** is a critical distinction. Snowpipe is event-driven micro-batch loading triggered by cloud notifications (SQS, SNS, GCS Pub/Sub) — files land in a stage and Snowpipe automatically copies them, typically within 1 minute. Snowpipe Streaming uses the Snowflake Streaming API (Kafka connector) for row-level, low-latency ingestion directly into tables, bypassing stages entirely.

**Streams** provide CDC on any Snowflake table, view, or external table — they track inserts, updates, and deletes since the last Stream consumption. Streams have **stale offsets** if not consumed within the retention period. **Tasks** trigger SQL on a schedule (CRON) or when a dependency task succeeds, enabling DAG-based pipelines. **Dynamic Tables** (COF-C03 priority) define a target refresh lag and Snowflake handles incremental computation automatically — they're the modern replacement for complex stream+task pipelines.

**Git Integration** (new in COF-C03) lets you sync a Git repository (GitHub, GitLab) into a Snowflake stage, enabling version-controlled stored procedures, UDFs, and scripts to be executed directly from the stage without manual uploads.`,
    topics: [
      'Snowpipe', 'Snowpipe Streaming', 'Streams', 'Tasks',
      'Dynamic Tables', 'COPY INTO', 'Stages', 'Git Integration',
      'Storage Integration', 'Directory Tables',
    ],
    tips: [
      { text: '<strong>COPY INTO tracks loaded files</strong> via a load history (64-day metadata). Re-running the same COPY won\'t reload files unless you use FORCE=TRUE or purge the history.' },
      { text: '<strong>Snowpipe vs. Bulk COPY:</strong> Snowpipe = continuous micro-batch (event-driven, higher cost per byte), COPY INTO = batch (manual/scheduled, cheaper for large loads).' },
      { text: '<strong>Streams consume offset</strong> — once a DML statement reads a stream inside a transaction, the offset advances. If the transaction fails/rolls back, the stream offset resets.' },
      { text: '<strong>Dynamic Tables vs. Materialized Views:</strong> Dynamic Tables support more complex SQL (multi-table, aggregations, joins), have configurable lag, and auto-refresh. MVs are simpler but faster to query.' },
      { text: '<strong>Git Integration stage</strong> behaves like a regular Snowflake stage — you can EXECUTE IMMEDIATE from it or reference scripts stored in Git repos, enabling true GitOps for Snowflake.' },
    ],
  },

  {
    id: 'd4',
    code: 'Domain 4',
    weight: '21%',
    title: 'Performance Optimization, Querying & Transformation',
    subdomains: [
      {
        name: 'Query Performance Analysis',
        items: [
          'Query Profile: visual execution plan, operator stats',
          'Key indicators: bytes spilled to storage, inefficient pruning, exploding joins, queuing',
          'ACCOUNT_USAGE.QUERY_HISTORY: full historical analysis',
          'Query Insights (Snowsight): automated recommendations',
          'Workload management: group similar queries by warehouse',
        ],
      },
      {
        name: 'Performance Optimization',
        items: [
          'Clustering keys: for large tables with range/equality filters on high-cardinality columns',
          'Clustering depth metric: lower is better (1.0 = perfectly clustered)',
          'Search Optimization Service: per-column indexes for point lookups and substring searches',
          'Query Acceleration Service (QAS): offloads outlier partitions to serverless compute',
          'Materialized Views: pre-computed results for expensive aggregation queries',
        ],
      },
      {
        name: 'Caching',
        items: [
          'Result Cache: exact same query returns instantly (24h TTL, invalidated on DML)',
          'Metadata Cache: COUNT(*), MIN, MAX from Cloud Services (no warehouse needed)',
          'Warehouse (Local Disk) Cache: SSD cache of recently scanned micro-partitions; lives per warehouse, lost on suspend',
        ],
      },
      {
        name: 'Data Transformation',
        items: [
          'Structured: standard SQL, window functions, aggregate functions',
          'Semi-structured: VARIANT column, FLATTEN / LATERAL FLATTEN, dot-notation path, bracket notation',
          'Unstructured: directory tables, SQL file functions (GET_PRESIGNED_URL, BUILD_STAGE_FILE_URL), UDFs for processing',
          'Window functions: ROW_NUMBER, RANK, DENSE_RANK, LEAD, LAG, NTILE',
        ],
      },
    ],
    summary: `Query performance in Snowflake starts with the **Query Profile** — a visual DAG showing every operator's execution time, rows processed, bytes spilled, and partition statistics. **Bytes spilled to local/remote storage** is the classic sign of a warehouse too small for the workload; scaling up (larger warehouse) is the fix. **Inefficient pruning** means clustering keys aren't aligned with query filters — adding or re-clustering fixes this. **Exploding joins** indicate cartesian-product-style joins, usually a data model issue.

The **three caching layers** are a core exam topic. The **Result Cache** (Cloud Services level) serves identical queries instantly — no warehouse credit used — but resets after 24 hours or any DML on underlying tables. The **Metadata Cache** answers aggregate questions (\`COUNT(*)\`, \`MIN\`, \`MAX\`) from metadata alone, also without a warehouse. The **Warehouse Cache** (local SSD on warehouse nodes) caches recently scanned micro-partitions; it's lost when the warehouse suspends, which is why suspending frequently-used warehouses can hurt performance.

**Clustering Keys** reorder micro-partitions to reduce partition pruning on large tables. Use them only when natural ordering doesn't align with query patterns and the table is very large (TB+). The **Clustering Depth** metric measures disorder — closer to 1.0 means well-clustered. The **Search Optimization Service** builds per-column point-lookup indexes, ideal for high-selectivity searches (\`WHERE email = 'x'\`). **Query Acceleration Service** automatically offloads portions of large scans to serverless compute for outlier-heavy queries.

**VARIANT and semi-structured data** is extensively tested. The \`VARIANT\` type stores JSON/XML/AVRO without schema enforcement. Access nested fields with dot notation (\`col:key.nested\`) or bracket notation. \`FLATTEN\` (and \`LATERAL FLATTEN\`) converts arrays into rows, enabling relational joins against JSON arrays.`,
    topics: [
      'Query Profile', 'Result Cache', 'Warehouse Cache', 'Metadata Cache',
      'Clustering Keys', 'Search Optimization Service', 'Query Acceleration Service',
      'VARIANT', 'FLATTEN', 'Window Functions',
    ],
    tips: [
      { text: '<strong>Result Cache = 24 hours</strong>, invalidated by DML. If a question says "same query runs instantly with no warehouse credits," that\'s Result Cache.' },
      { text: '<strong>Warehouse Cache is lost on suspend.</strong> Setting a long auto-suspend (or AUTO_SUSPEND=0 for BI warehouses) preserves the cache for repeated queries — important for BI tools.' },
      { text: '<strong>Scale UP</strong> (larger warehouse) when queries are spilling to disk. <strong>Scale OUT</strong> (more clusters) when many queries are queuing. These are tested as mutually exclusive solutions.' },
      { text: '<strong>Clustering keys</strong> aren\'t free: Automatic Clustering consumes compute credits continuously. Only apply to large tables with clear, repeated filter patterns on specific columns.' },
      { text: '<strong>LATERAL FLATTEN</strong> is the answer for turning JSON arrays into relational rows: <code>SELECT f.value FROM table t, LATERAL FLATTEN(input => t.col:items) f;</code>' },
    ],
  },

  {
    id: 'd5',
    code: 'Domain 5',
    weight: '10%',
    title: 'Data Collaboration & Protection',
    subdomains: [
      {
        name: 'Continuous Data Protection',
        items: [
          'Time Travel: query/restore past data (Standard: 1 day, Enterprise+: 90 days)',
          'AT (timestamp/offset/statement) and BEFORE clauses',
          'Fail-safe: 7 days AFTER Time Travel, non-queryable, Snowflake recovery only',
          'Cloning: zero-copy, instant, metadata-only operation; clones share storage until diverge',
          'Replication: database/account replication across regions and clouds',
          'Failover/Failback: Business Continuity for account-level DR',
        ],
      },
      {
        name: 'Secure Data Sharing',
        items: [
          'Provider: creates a share, adds objects, grants to consumer accounts',
          'Consumer: creates a read-only database from share — no data copy',
          'Reader Accounts: Snowflake-managed accounts for non-Snowflake consumers',
          'Direct shares vs. Data Listings',
          'Resharing: consumers can share to other consumers if allowed',
        ],
      },
      {
        name: 'Marketplace & Collaboration',
        items: [
          'Snowflake Marketplace: discover and subscribe to live data products',
          'Private listings: controlled sharing within an organization or partners',
          'Public listings: available to all Snowflake customers',
          'Data Clean Rooms (COF-C03 new): privacy-preserving joint analysis without exposing raw data',
          'Native Apps (Snowflake Native App Framework): package and publish apps with data in Snowflake',
        ],
      },
    ],
    summary: `Data protection in Snowflake operates through a layered system. **Time Travel** lets you query historical data using \`AT(TIMESTAMP => ...)\` or \`BEFORE(STATEMENT => ...)\` syntax. The retention period is 0–1 days for Standard, 0–90 days for Enterprise+. After Time Travel expires, data enters **Fail-safe** — a 7-day read-only recovery window accessible only to Snowflake Support (not users). No credits are consumed by Fail-safe, but storage is billed.

**Cloning** is one of Snowflake's most powerful features. \`CREATE TABLE t2 CLONE t1\` is instant and costs no additional storage initially — it's a metadata-only operation that creates a new object pointing to the same micro-partitions. As the clone or original is modified, storage diverges (copy-on-write). Clones include all child objects (schemas, tables) when cloning a database. Clones can even clone historical states using Time Travel.

**Secure Data Sharing** is live data sharing — consumers access a shared database with no data copied and no ETL. Only account-to-account, within the same cloud region by default. For consumers without Snowflake accounts, **Reader Accounts** are Snowflake-managed accounts provisioned by the provider.

**COF-C03 new: Data Clean Rooms** enable privacy-preserving analytics where two parties can run joint queries on their combined data without either party seeing the other's raw data. Implemented via the Snowflake Native App Framework with restricted query patterns. **Native Apps** let developers package SQL, Python, Streamlit apps with data into installable applications on the Marketplace.`,
    topics: [
      'Time Travel', 'Fail-safe', 'Zero-copy Cloning', 'Secure Data Sharing',
      'Reader Accounts', 'Snowflake Marketplace', 'Data Clean Rooms',
      'Native Apps', 'Replication', 'Failover',
    ],
    tips: [
      { text: '<strong>Fail-safe is NOT queryable by users</strong> — only Snowflake Support can recover it. Time Travel IS queryable. Questions about "user-initiated recovery" = Time Travel.' },
      { text: '<strong>Cloning creates zero-copy instantly</strong> but the clone is INDEPENDENT — DDL on the source doesn\'t affect the clone. DML causes storage divergence via copy-on-write.' },
      { text: '<strong>Sharing is read-only for consumers</strong> and live — no ETL, no copy. The consumer creates a database from the share: <code>CREATE DATABASE shared_db FROM SHARE provider.share_name;</code>' },
      { text: '<strong>Time Travel + Clone combo:</strong> You can clone a table as of a point in time: <code>CREATE TABLE restored CLONE original AT(TIMESTAMP => \'2024-01-01\'::timestamp);</code>' },
      { text: '<strong>Data Clean Rooms (COF-C03):</strong> Built on Native Apps framework. The key differentiator is that participants define allowed query patterns upfront — neither party can query raw data of the other.' },
    ],
  },
];


/* ─────────────────────────────────────────────
   EXAM QUESTIONS  (60 total, all 5 domains)
   ───────────────────────────────────────────── */
const ALL_QUESTIONS = [

  // ── DOMAIN 1  (~19 questions, 31%) ──────────
  {
    domain: 'D1',
    text: 'Which layer of the Snowflake architecture handles query compilation, optimization, and metadata management?',
    opts: ['Database Storage layer', 'Compute layer', 'Cloud Services layer', 'Virtual Warehouse layer'],
    ans: [2],
    explanation: 'The Cloud Services layer is the "brain" of Snowflake — it handles authentication, access control, query parsing, optimization (creating an execution plan), metadata management, and transaction coordination. It runs across all Snowflake accounts simultaneously and doesn\'t require a virtual warehouse to be active.',
  },
  {
    domain: 'D1',
    multi: true,
    text: 'Which of the following Snowflake features are part of the AI/ML capabilities introduced or expanded in COF-C03? (Select TWO)',
    opts: ['Snowpipe Streaming', 'Cortex Analyst', 'Time Travel', 'Snowflake ML', 'Fail-safe'],
    ans: [1, 3],
    explanation: 'Cortex Analyst allows natural-language queries over structured data, and Snowflake ML provides AutoML functions (forecasting, classification, anomaly detection) — both are new/expanded AI/ML features in COF-C03. Snowpipe Streaming, Time Travel, and Fail-safe are existing data loading and protection features.',
  },
  {
    domain: 'D1',
    text: 'A data engineer needs to run large-scale Python-based ML model training inside Snowflake. Which virtual warehouse type is MOST appropriate?',
    opts: ['Standard Gen 1 warehouse', 'Standard Gen 2 warehouse', 'Snowpark Optimized warehouse', 'Multi-cluster warehouse'],
    ans: [2],
    explanation: 'Snowpark Optimized warehouses are purpose-built for memory-intensive workloads like ML model training, feature engineering, and large Snowpark DataFrame operations. They provide more CPU and RAM per node than Standard warehouses. Multi-cluster warehouses address concurrency (many users), not single-job memory requirements.',
  },
  {
    domain: 'D1',
    text: 'A query returns in under 1 second without consuming any virtual warehouse credits. What Snowflake capability is most likely responsible?',
    opts: ['Warehouse cache hit', 'Result cache hit', 'Metadata cache hit', 'Materialized view lookup'],
    ans: [2],
    explanation: 'The Metadata Cache (in the Cloud Services layer) answers queries like COUNT(*), MIN, MAX using stored micro-partition metadata — without activating a virtual warehouse at all. No credits are consumed. Result cache also uses no warehouse credits, but the question specifies "under 1 second" which is more characteristic of metadata operations.',
  },
  {
    domain: 'D1',
    text: 'What is the primary characteristic of Snowflake micro-partitions?',
    opts: [
      'They are user-defined, fixed 64MB compressed files',
      'They are automatically created, 50-500MB uncompressed, columnar, and compressed',
      'They are row-based storage units sized by the user',
      'They require manual creation using the CLUSTER BY command',
    ],
    ans: [1],
    explanation: 'Micro-partitions are Snowflake\'s fundamental storage units — automatically created, 50–500 MB uncompressed, stored in columnar format with per-column metadata (min, max, count, distinct values). Users never create or manage them directly. CLUSTER BY only reorders data within micro-partitions, it doesn\'t create them.',
  },
  {
    domain: 'D1',
    text: 'A table has a CLUSTER BY (region, year) key. Which query will benefit MOST from this clustering?',
    opts: [
      "SELECT * FROM sales WHERE product = 'Widget'",
      "SELECT * FROM sales WHERE region = 'US' AND year = 2024",
      'SELECT COUNT(*) FROM sales',
      'SELECT * FROM sales ORDER BY order_date',
    ],
    ans: [1],
    explanation: 'Clustering keys reorder micro-partitions based on the specified columns, enabling pruning of partitions that don\'t match filter values. A query filtering on (region, year) — the exact clustering key — will prune the most partitions and scan the fewest micro-partitions. Queries on other columns won\'t benefit from this clustering.',
  },
  {
    domain: 'D1',
    text: 'Which Snowflake Cortex function would you use to perform sentiment analysis on customer reviews stored in a table column?',
    opts: [
      'SNOWFLAKE.CORTEX.COMPLETE()',
      'SNOWFLAKE.CORTEX.SENTIMENT()',
      'SNOWFLAKE.CORTEX.CLASSIFY_TEXT()',
      'SNOWFLAKE.CORTEX.EXTRACT_ANSWER()',
    ],
    ans: [1],
    explanation: 'SNOWFLAKE.CORTEX.SENTIMENT(text) returns a sentiment score between -1 (negative) and 1 (positive) for the input text. COMPLETE() is for general LLM generation, CLASSIFY_TEXT() categorizes text into provided classes, and EXTRACT_ANSWER() extracts answers from a given context passage.',
  },
  {
    domain: 'D1',
    text: 'What is the key architectural difference between a Standard and a Snowpark Optimized virtual warehouse?',
    opts: [
      'Snowpark Optimized supports multi-clustering; Standard does not',
      'Snowpark Optimized provides more memory per node for intensive workloads',
      'Snowpark Optimized can access external stages; Standard cannot',
      'Snowpark Optimized uses a different storage layer',
    ],
    ans: [1],
    explanation: 'Snowpark Optimized warehouses have a larger ratio of memory (RAM) to compute per node, designed for memory-intensive operations like ML model training and large Snowpark DataFrames. Both warehouse types can use multi-clustering, access external stages, and use the same storage layer.',
  },
  {
    domain: 'D1',
    text: 'Which table type in Snowflake exists only for the duration of a session and is not visible to other users?',
    opts: ['Transient table', 'Permanent table', 'Temporary table', 'External table'],
    ans: [2],
    explanation: 'Temporary tables exist only within a user session and are automatically dropped when the session ends. They\'re not visible to other users or sessions. Transient tables persist across sessions but lack Fail-safe. External tables reference data in external stages. Permanent tables have full Time Travel and Fail-safe.',
  },
  {
    domain: 'D1',
    text: 'What does the Snowflake Cortex Search feature primarily enable?',
    opts: [
      'Running SQL queries against external databases',
      'Full-text and semantic (vector) search over Snowflake data for RAG applications',
      'Automated report generation from structured data',
      'Scheduling ML model retraining jobs',
    ],
    ans: [1],
    explanation: 'Cortex Search builds a hybrid search index (combining keyword BM25 and semantic vector search) on Snowflake tables, enabling retrieval-augmented generation (RAG) patterns — powering chatbots and AI applications that need to retrieve relevant context from enterprise data.',
  },
  {
    domain: 'D1',
    text: 'A multi-cluster warehouse is configured with min=1, max=5, and SCALING_POLICY=ECONOMY. When will additional clusters start?',
    opts: [
      'When any query is queued',
      'When at least one cluster is consistently busy for several consecutive minutes',
      'When total query count exceeds 100',
      'Immediately when the first additional query arrives',
    ],
    ans: [1],
    explanation: 'Economy scaling policy (vs. Maximized) starts additional clusters conservatively — only when the existing cluster is sustained-busy over several minutes, to avoid spinning up extra clusters for transient bursts. Maximized policy keeps all clusters running always. Economy optimizes for credit cost over latency.',
  },
  {
    domain: 'D1',
    text: 'Which Snowflake edition is required to use Time Travel with a data retention period of up to 90 days?',
    opts: ['Standard', 'Business Critical', 'Enterprise', 'Virtual Private Snowflake'],
    ans: [2],
    explanation: 'Enterprise edition (and higher: Business Critical, VPS) supports Time Travel retention up to 90 days. Standard edition is limited to 1 day. Business Critical and VPS add HIPAA/PCI compliance on top of all Enterprise features.',
  },
  {
    domain: 'D1',
    text: 'What is the purpose of Snowflake Notebooks?',
    opts: [
      'To schedule recurring SQL queries',
      'To provide an interactive, Jupyter-style environment for SQL, Python, and Markdown inside Snowflake',
      'To manage data sharing between Snowflake accounts',
      'To configure virtual warehouse auto-scaling policies',
    ],
    ans: [1],
    explanation: 'Snowflake Notebooks (new in COF-C03) provide an interactive notebook experience within Snowflake — combining SQL cells, Python cells (via Snowpark), and Markdown cells. They run with Snowflake\'s security context, meaning no data leaves Snowflake, and they\'re stored as Snowflake objects.',
  },
  {
    domain: 'D1',
    text: 'A Secure View differs from a Standard View primarily because:',
    opts: [
      'It is faster to query',
      'The view definition is hidden from non-owner roles and data is not exposed via query optimization metadata',
      'It cannot be shared using Secure Data Sharing',
      'It requires Enterprise edition',
    ],
    ans: [1],
    explanation: 'Secure Views hide their definition (the underlying SQL) from users who don\'t own the view, preventing reverse-engineering of sensitive logic. They also disable certain optimizer optimizations that could leak information about underlying data through explain plans. They are specifically required for Secure Data Sharing.',
  },
  {
    domain: 'D1',
    text: 'What is a Dynamic Table in Snowflake?',
    opts: [
      'A table that automatically adds columns as new data arrives',
      'A declarative table whose contents are automatically refreshed based on a target lag from a defining query',
      'A table that changes its clustering key dynamically',
      'A materialized view that is refreshed every minute',
    ],
    ans: [1],
    explanation: 'Dynamic Tables are a declarative data transformation feature: you define a SQL query and a target lag (e.g., \'1 minute\', \'1 hour\'). Snowflake\'s engine incrementally maintains the table\'s contents as source data changes. They replace complex stream+task pipelines with a simpler, declarative approach.',
  },
  {
    domain: 'D1',
    text: 'Which of the following describes the Snowflake architecture\'s approach to compute and storage?',
    opts: [
      'Compute and storage are tightly coupled; scaling one requires scaling the other',
      'Compute and storage are completely separated and scale independently',
      'Storage is managed by cloud providers but compute is proprietary',
      'Compute scales automatically; storage is fixed per account',
    ],
    ans: [1],
    explanation: 'This is Snowflake\'s foundational architectural principle: complete separation of compute and storage. Virtual warehouses (compute) can be started, stopped, and resized independently of storage. Multiple warehouses can simultaneously access the same data. This enables truly elastic compute without over-provisioning storage.',
  },
  {
    domain: 'D1',
    text: 'When does the Cloud Services layer consume additional Snowflake credits?',
    opts: [
      'Always, for every query executed',
      'When Cloud Services costs exceed 10% of the daily compute credits used',
      'For every metadata operation',
      'Never — Cloud Services is always free',
    ],
    ans: [1],
    explanation: 'Cloud Services layer usage is billed only when it exceeds 10% of the total daily warehouse compute credits. If your warehouse compute is 100 credits, up to 10 credits of Cloud Services is included free. This is a nuanced billing detail that appears on the exam.',
  },
  {
    domain: 'D1',
    text: 'A developer wants to write Python code that processes data inside Snowflake without moving it to an external environment. Which feature should they use?',
    opts: ['External functions', 'Snowflake CLI', 'Snowpark', 'Snowflake Data Clean Room'],
    ans: [2],
    explanation: 'Snowpark allows developers to write code in Python (also Java and Scala) using a DataFrame API that executes directly inside Snowflake\'s compute engine. Data never leaves Snowflake, and all processing benefits from Snowflake\'s scalability and security. External functions call external services, which does involve data movement.',
  },
  {
    domain: 'D1',
    text: 'Which Snowflake Cortex capability allows business analysts to ask questions in plain English about structured data tables without writing SQL?',
    opts: ['Cortex Search', 'Cortex Analyst', 'COMPLETE() function', 'Snowflake Notebooks'],
    ans: [1],
    explanation: 'Cortex Analyst is a semantic layer feature that allows users to ask natural-language questions about structured Snowflake tables (e.g., "What were total sales in Q4 by region?"). It interprets the question, generates SQL, executes it, and returns results — no SQL knowledge required from the end user.',
  },

  // ── DOMAIN 2  (~12 questions, 20%) ──────────
  {
    domain: 'D2',
    text: 'A new engineer needs access to query data in the ANALYTICS database. Following least-privilege best practices, which action should the Snowflake administrator take?',
    opts: [
      'Grant the ACCOUNTADMIN role to the engineer',
      'Grant USAGE on the database and schema, and SELECT on specific tables to a custom role, then assign that role to the engineer',
      'Grant SYSADMIN to the engineer',
      'Grant PUBLIC role access to all tables',
    ],
    ans: [1],
    explanation: 'Least-privilege means granting only the minimum permissions needed. The correct pattern: create a custom role, grant USAGE on database and schema (to allow navigation), grant SELECT on specific tables (for query access), then GRANT ROLE to the user. Never use ACCOUNTADMIN for daily operations.',
  },
  {
    domain: 'D2',
    text: 'What is the key difference between Account Roles and Database Roles in Snowflake?',
    opts: [
      'Account Roles can only be used for administrative tasks',
      'Database Roles are scoped to a single database and cannot be granted account-level privileges',
      'Database Roles require ACCOUNTADMIN to create',
      'Account Roles are automatically created; Database Roles must be manually created',
    ],
    ans: [1],
    explanation: 'Database Roles are new in COF-C03 and scoped to a single database — they can only grant privileges on objects within that database. Account Roles apply account-wide. Database Roles are ideal for sharing — when you share a database, you can include database roles to control what the consumer can access within the shared database.',
  },
  {
    domain: 'D2',
    text: 'A user wants to use privileges from multiple roles simultaneously in a single session. Which Snowflake feature enables this?',
    opts: ['Role inheritance', 'Secondary Roles', 'Role hierarchy', 'Custom roles'],
    ans: [1],
    explanation: 'Secondary Roles (USE SECONDARY ROLES ALL;) allow a user to activate all their granted roles simultaneously, combining all privileges. Previously, users could only use one PRIMARY role at a time and had to switch roles to access different objects. This is a new, COF-C03-emphasized feature.',
  },
  {
    domain: 'D2',
    text: 'A Dynamic Data Masking policy is applied to a column containing SSNs. Which statement is TRUE?',
    opts: [
      'The data is permanently encrypted and cannot be accessed by anyone',
      'Roles with the MASKING_ADMIN role see masked data; all others see full data',
      'Users querying the column will see masked or unmasked data based on their role at query time',
      'The masking policy applies during data loading, not at query time',
    ],
    ans: [2],
    explanation: 'Dynamic Data Masking applies at query time — the underlying data is stored unmasked, and the masking policy function determines what each role sees when they run a query. Roles defined as "unmasked" in the policy see full data; others see the masked version. This is purely a read-time security mechanism.',
  },
  {
    domain: 'D2',
    text: 'Which Snowflake schema contains historical usage data with up to 1 year retention but has an approximate 3-hour data latency?',
    opts: ['INFORMATION_SCHEMA', 'ACCOUNT_USAGE', 'QUERY_HISTORY', 'USAGE_HISTORY'],
    ans: [1],
    explanation: 'SNOWFLAKE.ACCOUNT_USAGE is the historical audit and usage data schema with up to 1 year of retention. The trade-off is ~3-hour data latency (data appears with a delay). INFORMATION_SCHEMA is the real-time, standards-compliant schema with 7-day retention and no latency but limited historical depth.',
  },
  {
    domain: 'D2',
    text: 'What is the purpose of a Resource Monitor in Snowflake?',
    opts: [
      'To monitor data quality in ingestion pipelines',
      'To set credit usage thresholds on virtual warehouses or the account, triggering notifications or suspension',
      'To track query performance metrics over time',
      'To manage role-based access control policies',
    ],
    ans: [1],
    explanation: 'Resource Monitors are governance objects that track credit consumption for virtual warehouses or the entire account. When credit thresholds are reached, they can send notifications, suspend warehouses, or trigger custom webhooks. They\'re the primary tool for cost control on compute.',
  },
  {
    domain: 'D2',
    text: 'A Row Access Policy is applied to a table called SALES. Which statement BEST describes the behavior?',
    opts: [
      'All users see all rows; the policy only logs access',
      'Rows are physically deleted based on the policy',
      'The policy filters rows at query time based on session context (e.g., querying role), so different users see different subsets of rows',
      'The policy prevents any DML on the table',
    ],
    ans: [2],
    explanation: 'Row Access Policies implement row-level security by attaching a policy function to a table. The function evaluates session context (e.g., CURRENT_ROLE() or session variables) and returns a boolean to include or exclude each row. This happens transparently at query time — the base data is unchanged.',
  },
  {
    domain: 'D2',
    text: 'Which system-defined Snowflake role should be used to manage user accounts and roles (but NOT data objects)?',
    opts: ['SYSADMIN', 'ACCOUNTADMIN', 'USERADMIN', 'SECURITYADMIN'],
    ans: [2],
    explanation: 'USERADMIN is specifically designed for user and role management — creating users, assigning roles. SECURITYADMIN manages security policies and can grant/revoke privileges. SYSADMIN manages databases and data objects. ACCOUNTADMIN is the superuser with all privileges across the account.',
  },
  {
    domain: 'D2',
    text: 'What does the Trust Center in Snowflake provide? (COF-C03)',
    opts: [
      'A marketplace for purchasing third-party security tools',
      'A centralized dashboard showing security posture, misconfigurations, and compliance alerts across the account',
      'A tool to encrypt data at rest',
      'A feature to manage Time Travel retention settings',
    ],
    ans: [1],
    explanation: 'Trust Center (new in COF-C03) is a unified security posture dashboard that surfaces security findings, compliance gaps, and misconfigurations across the account — similar to AWS Security Hub. It shows things like warehouses without Resource Monitors, overprivileged roles, or missing MFA enforcement.',
  },
  {
    domain: 'D2',
    text: 'An organization has a Snowflake data producer and wants to share data with a partner who does NOT have a Snowflake account. What is the best approach?',
    opts: [
      'Export data to S3 and send credentials to the partner',
      'Use Snowpipe to push data to the partner',
      'Create a Reader Account and share data to it',
      'Purchase an Enterprise license and grant access',
    ],
    ans: [2],
    explanation: 'Reader Accounts are Snowflake-managed accounts created by a provider specifically for consumers who don\'t have their own Snowflake accounts. The provider provisions, manages, and pays for the Reader Account compute. The consumer accesses shared data via a web browser or JDBC/ODBC without needing a Snowflake subscription.',
  },
  {
    domain: 'D2',
    text: 'Which Snowflake feature tracks the origin and transformation history of columns across tables and views?',
    opts: ['Object Tagging', 'Access History', 'Data Lineage', 'Information Schema'],
    ans: [2],
    explanation: 'Data Lineage (new in COF-C03) automatically tracks how columns flow through transformations — from source tables through views, dynamic tables, and other transformations. It provides an audit trail showing where data originated and how it was transformed, critical for compliance and data governance.',
  },
  {
    domain: 'D2',
    text: 'What is the difference between SYSADMIN and SECURITYADMIN in Snowflake?',
    opts: [
      'SYSADMIN can create warehouses; SECURITYADMIN cannot',
      'SYSADMIN manages database objects and compute; SECURITYADMIN manages users, roles, and security policies',
      'SECURITYADMIN can read all data; SYSADMIN cannot',
      'There is no difference — they are aliases',
    ],
    ans: [1],
    explanation: 'SYSADMIN is responsible for creating and managing Snowflake data objects (databases, warehouses, schemas, tables) and is typically the role used for data engineering. SECURITYADMIN manages RBAC — creating roles, granting/revoking privileges, and managing network policies. Separating these duties is a security best practice.',
  },

  // ── DOMAIN 3  (~11 questions, 18%) ──────────
  {
    domain: 'D3',
    text: 'A company wants to load a 1TB CSV file from an S3 bucket into a Snowflake table. What is the recommended approach?',
    opts: [
      'Use INSERT INTO with a SELECT from the S3 URL',
      'Create an external stage pointing to S3, then use COPY INTO',
      'Upload the file using PUT to an internal stage, then use COPY INTO',
      'Use Snowpipe for a single large file',
    ],
    ans: [1],
    explanation: 'For large bulk loads from S3: (1) Create a named external stage with a storage integration pointing to the S3 bucket, (2) optionally create a file format, (3) use COPY INTO <table> FROM @stage. COPY INTO is the high-performance bulk loader for Snowflake. PUT is for uploading local files to internal stages, not for S3.',
  },
  {
    domain: 'D3',
    text: 'What is the primary difference between Snowpipe and the COPY INTO command for data loading?',
    opts: [
      'Snowpipe supports more file formats than COPY INTO',
      'Snowpipe provides event-driven, continuous micro-batch loading; COPY INTO is used for scheduled bulk loads',
      'COPY INTO is faster for all workloads',
      'Snowpipe can only load JSON; COPY INTO handles all formats',
    ],
    ans: [1],
    explanation: 'Snowpipe is event-driven — cloud storage notifications (SQS, SNS, GCS Pub/Sub) trigger automatic loading when new files arrive in a stage, enabling near-real-time ingestion. COPY INTO is a manual/scheduled batch command best for large periodic loads. Snowpipe has higher cost per byte but lower latency.',
  },
  {
    domain: 'D3',
    text: 'A Stream is created on a table called ORDERS. After the stream is consumed in a successful DML transaction, what happens to the stream\'s offset?',
    opts: [
      'The stream is dropped automatically',
      'The stream offset advances past the consumed changes, clearing those records from the stream',
      'The stream retains all records for audit purposes',
      'The stream offset resets to the beginning of the table',
    ],
    ans: [1],
    explanation: 'Streams are CDC change logs. When you consume a stream (read it in a DML transaction that commits successfully), the stream\'s offset advances — those changes are marked as consumed and cleared from the stream. New changes after that point will appear in subsequent stream reads. If the transaction rolls back, the offset is not advanced.',
  },
  {
    domain: 'D3',
    text: 'Which stage type in Snowflake is created automatically for each user and is referenced with @~?',
    opts: ['Table stage', 'Named internal stage', 'User stage', 'External stage'],
    ans: [2],
    explanation: '@~ is the shorthand for the user stage — an internal stage automatically created for every Snowflake user. It\'s private to that user (other users can\'t access it). @%table_name is the table stage (auto-created per table). Named stages (@stage_name) are explicitly created objects with configurable properties.',
  },
  {
    domain: 'D3',
    text: 'What does the VALIDATE command do in Snowflake?',
    opts: [
      'Validates schema changes before applying them',
      'Validates the results of a previous COPY INTO command, returning any file parsing errors without loading data',
      'Checks role and privilege assignments',
      'Tests network connectivity to external stages',
    ],
    ans: [1],
    explanation: 'VALIDATE(<table>, JOB_ID=>) retrospectively validates the results of a completed or ongoing COPY INTO operation, showing which files had errors and what those errors were. It allows you to check load quality without re-running the load. This is different from using the ON_ERROR option during the COPY itself.',
  },
  {
    domain: 'D3',
    text: 'A pipeline needs to continuously ingest streaming data from Apache Kafka into a Snowflake table with very low latency (seconds). What is the BEST approach?',
    opts: [
      'Snowpipe with S3 event notifications',
      'COPY INTO run every 30 seconds via a task',
      'Snowpipe Streaming with the Kafka connector',
      'Snowflake Streams watching an external stage',
    ],
    ans: [2],
    explanation: 'Snowpipe Streaming (using the Snowflake Streaming Ingest API, commonly via the Kafka Connector) provides row-level, low-latency ingestion directly into Snowflake tables — bypassing staging entirely. It provides second-level latency. Regular Snowpipe still micro-batches files, Kafka connector with classic Snowpipe has ~1-minute lag.',
  },
  {
    domain: 'D3',
    text: 'Which feature in COF-C03 allows you to sync a Git repository into a Snowflake stage, enabling version-controlled stored procedures?',
    opts: ['Snowflake CLI', 'Git Integration', 'External Stage', 'Snowflake Marketplace'],
    ans: [1],
    explanation: 'Git Integration (new in COF-C03) creates a Snowflake object that connects to a Git repository (GitHub, GitLab, etc.). When synced, the repo contents appear in a special stage, allowing EXECUTE IMMEDIATE FROM @git_stage/path/to/script.sql — enabling GitOps workflows for Snowflake objects.',
  },
  {
    domain: 'D3',
    text: 'What is the purpose of a Storage Integration in Snowflake?',
    opts: [
      'To replicate data between Snowflake accounts',
      'To allow Snowflake to access cloud storage (S3, Azure, GCS) without embedding cloud credentials in stage definitions',
      'To define the schema for data being loaded from external sources',
      'To configure Snowpipe notification channels',
    ],
    ans: [1],
    explanation: 'Storage Integrations are Snowflake account-level objects that store cloud provider credentials (IAM role ARN for AWS, service principal for Azure, service account for GCS). External stages reference the storage integration instead of embedding credentials, following the principle of separation of credentials from configuration.',
  },
  {
    domain: 'D3',
    text: 'A Dynamic Table has a target lag of "1 hour". What does this mean?',
    opts: [
      'Snowflake guarantees the table is refreshed every exactly 1 hour',
      'The table\'s data should not lag more than 1 hour behind its source data',
      'Snowflake waits 1 hour before starting the first refresh',
      'Users must wait 1 hour before they can query the table',
    ],
    ans: [1],
    explanation: 'Target lag defines the maximum acceptable staleness of a Dynamic Table relative to its source. Snowflake\'s engine schedules incremental refreshes to maintain data within that lag. The actual refresh frequency depends on source data change rate and available compute — it may refresh more frequently if data changes often.',
  },
  {
    domain: 'D3',
    text: 'Which error handling option in the COPY INTO command skips a file entirely if it exceeds a certain error threshold?',
    opts: ['ABORT_STATEMENT', 'CONTINUE', 'SKIP_FILE', 'RETURN_FAILED_ONLY'],
    ans: [2],
    explanation: 'SKIP_FILE skips the entire file (not just errored rows) when the number of errors exceeds a threshold (ON_ERROR=SKIP_FILE_<n>%). CONTINUE skips only the errored rows and continues loading good rows. ABORT_STATEMENT (default) rolls back and aborts on the first error.',
  },
  {
    domain: 'D3',
    text: 'What are Directory Tables in Snowflake?',
    opts: [
      'Tables that store file metadata for all files loaded via COPY INTO',
      'Special tables that maintain a catalog of files in a stage, including file paths and metadata',
      'Tables optimized for directory lookups of key-value data',
      'System tables in ACCOUNT_USAGE for stage file history',
    ],
    ans: [1],
    explanation: 'Directory tables are an auto-maintained catalog of files stored in a stage. They expose file metadata (path, size, last modified, etag) as queryable rows — enabling SQL access to file listings without using LIST commands. They must be enabled on the stage and refreshed with ALTER STAGE REFRESH.',
  },

  // ── DOMAIN 4  (~13 questions, 21%) ──────────
  {
    domain: 'D4',
    text: 'A query is slow. The Query Profile shows large amounts of "Bytes Spilled to Remote Storage." What is the most likely cause and solution?',
    opts: [
      'The clustering keys are wrong; reclustering will fix this',
      'The virtual warehouse is too small for the data volume; scale up to a larger warehouse size',
      'The result cache is disabled; enable caching',
      'The query has too many JOINs; rewrite the SQL',
    ],
    ans: [1],
    explanation: 'Spilling to remote storage occurs when the warehouse\'s SSD (local disk) cache is exhausted and data spills to S3/Azure/GCS storage — which is extremely slow. This indicates the warehouse is undersized for the memory requirements of the query. Scaling up (larger warehouse = more memory per node) is the solution.',
  },
  {
    domain: 'D4',
    text: 'What is the correct description of the Snowflake Result Cache?',
    opts: [
      'It caches query results in the virtual warehouse for 48 hours',
      'It stores the most recent query results in the Cloud Services layer for 24 hours; identical subsequent queries return the cached result at no compute cost',
      'It is a persistent cache stored in the Database Storage layer',
      'It only caches SELECT * queries',
    ],
    ans: [1],
    explanation: 'The Result Cache lives in the Cloud Services layer (not in the warehouse). When an identical query (same SQL text, same user role, same parameter settings) is run within 24 hours and the underlying data hasn\'t changed (no DML), the result is returned instantly from cache — zero warehouse credits consumed.',
  },
  {
    domain: 'D4',
    text: 'A BI tool repeatedly runs the same 10 dashboards overnight. Users complain the dashboards are slow in the morning. The virtual warehouse is set to AUTO_SUSPEND=60 (1 minute). What is the likely cause?',
    opts: [
      'The BI tool is using the wrong warehouse size',
      'The warehouse suspends overnight, losing its local disk (warehouse) cache, causing cold starts in the morning',
      'The result cache expires every 4 hours',
      'The BI queries have too many aggregations',
    ],
    ans: [1],
    explanation: 'The Warehouse Cache (local SSD on warehouse nodes) holds recently scanned micro-partitions, dramatically speeding up repeated queries on the same data. When the warehouse suspends (even for 1 minute), this cache is cleared. Morning queries must re-scan all micro-partitions from cloud storage, causing slow start. Solution: increase auto-suspend for this warehouse or disable it.',
  },
  {
    domain: 'D4',
    text: 'When is Scaling UP (larger warehouse) preferred over Scaling OUT (more clusters)?',
    opts: [
      'When many concurrent users are queuing',
      'When a single query is slow due to memory pressure or data spilling',
      'When the team needs to segregate workloads',
      'When the warehouse serves multiple departments',
    ],
    ans: [1],
    explanation: 'Scale UP (XS→S→M→L→XL etc.) = more memory and CPU per query node — fixes slow individual queries caused by insufficient memory (spilling). Scale OUT (multi-cluster: more clusters) = more queries run in parallel — fixes queue buildup from many concurrent queries. These address fundamentally different bottlenecks.',
  },
  {
    domain: 'D4',
    text: "Which Snowflake feature builds per-column point-lookup indexes to speed up highly selective searches like WHERE email = 'john@example.com'?",
    opts: ['Clustering Keys', 'Query Acceleration Service', 'Search Optimization Service', 'Materialized Views'],
    ans: [2],
    explanation: 'Search Optimization Service builds per-table, per-column secondary indexes optimized for point lookups (equality predicates), substring searches, and VARIANT field access. It\'s ideal for high-selectivity queries that don\'t benefit from clustering (because they look for specific values, not ranges). It costs extra storage and maintenance credits.',
  },
  {
    domain: 'D4',
    text: 'The Query Acceleration Service (QAS) is BEST suited for which scenario?',
    opts: [
      'Queries with high concurrency contention',
      'Queries with complex joins across large tables where some partitions take much longer to scan than others (outlier partitions)',
      'Improving metadata cache hit rate',
      'Reducing compilation time for complex SQL',
    ],
    ans: [1],
    explanation: 'QAS identifies "outlier" partitions within a query that take significantly longer to scan than others — skewing the overall query duration. It offloads these outlier partitions to elastic serverless compute, parallelizing their processing. It\'s serverless (no warehouse management), charged per compute used.',
  },
  {
    domain: 'D4',
    text: 'A developer queries a VARIANT column containing JSON: {"user": {"name": "Alice", "age": 30}}. How would they extract "Alice" using Snowflake SQL?',
    opts: [
      "data['user']['name']::STRING",
      'data:user:name::STRING',
      'EXTRACT(name FROM data)',
      "JSON_VALUE(data, '$.user.name')",
    ],
    ans: [1],
    explanation: 'Snowflake uses colon-notation for VARIANT path traversal: column:key1:key2 navigates nested JSON. The ::STRING cast converts the VARIANT value to a string. Bracket notation (data[\'user\'][\'name\']) also works for VARIANT, but the canonical Snowflake style uses colons. Standard SQL JSON functions like JSON_VALUE are not used in Snowflake.',
  },
  {
    domain: 'D4',
    text: 'What does LATERAL FLATTEN do in Snowflake?',
    opts: [
      'Joins two tables using a lateral join on a common key',
      'Converts a VARIANT column containing an array into individual rows, one per array element',
      'Compresses JSON data into a VARIANT column',
      'Extracts all keys from a JSON object into a separate column',
    ],
    ans: [1],
    explanation: 'LATERAL FLATTEN unnests arrays or objects from VARIANT columns into rows. The LATERAL keyword allows the function to reference the outer table\'s columns. Example: SELECT f.value FROM table t, LATERAL FLATTEN(input => t.json_col:items) f; — each element in the items array becomes a separate row.',
  },
  {
    domain: 'D4',
    text: 'A Snowflake table has a Clustering Depth metric of 4.2. What does this indicate?',
    opts: [
      'The table has 4.2 TB of data',
      'On average, 4.2 micro-partitions overlap in the clustering key range — poor clustering that will cause unnecessary partition scanning',
      'The table was last clustered 4.2 days ago',
      '4.2% of micro-partitions are unclustered',
    ],
    ans: [1],
    explanation: 'Clustering Depth (SYSTEM$CLUSTERING_DEPTH function) measures micro-partition overlap for a given column. A value of 1.0 means perfectly clustered (no overlap). Higher values indicate more micro-partitions need to be scanned for range queries. A value of 4.2 means queries filter on this column may scan ~4x more data than necessary.',
  },
  {
    domain: 'D4',
    text: 'Which Snowflake aggregate functions use the Metadata Cache (Cloud Services) and require NO virtual warehouse?',
    opts: [
      'SUM() and AVG()',
      'COUNT(*), MIN(), and MAX() on specific columns',
      'COUNT(*), MIN(), MAX(), and COUNT(DISTINCT col)',
      'Any SELECT query on a table',
    ],
    ans: [1],
    explanation: 'COUNT(*) (total row count), MIN() and MAX() on non-VARIANT columns can be answered entirely from micro-partition metadata stored in the Cloud Services layer — no warehouse needed, zero compute credits consumed. More complex aggregations (SUM, AVG, COUNT DISTINCT) require a warehouse to scan actual data.',
  },
  {
    domain: 'D4',
    text: 'A window function is needed to rank rows within each region by sales amount, allowing ties to share ranks with gaps afterward. Which function should be used?',
    opts: ['ROW_NUMBER()', 'DENSE_RANK()', 'RANK()', 'NTILE()'],
    ans: [2],
    explanation: 'RANK() assigns the same rank to tied rows but leaves gaps in the ranking sequence (e.g., 1, 1, 3 — gap after the tie). DENSE_RANK() assigns the same rank to ties with no gaps (1, 1, 2). ROW_NUMBER() assigns unique numbers regardless of ties. NTILE() divides rows into N equal buckets.',
  },
  {
    domain: 'D4',
    text: 'What happens to the Warehouse Cache when a virtual warehouse is suspended?',
    opts: [
      'The cache is persisted to cloud storage for reuse on resume',
      'The cache is completely cleared; all cached micro-partitions must be re-fetched from cloud storage after resume',
      'Only the oldest entries are evicted; recent data is retained',
      'The cache is transferred to another warehouse',
    ],
    ans: [1],
    explanation: 'When a virtual warehouse suspends, its local SSD cache (warehouse cache) is completely cleared. Upon resuming, the warehouse starts with an empty local cache. This is why frequently suspending and resuming a warehouse used by BI tools can hurt performance — every query requires fetching micro-partitions from cloud storage again.',
  },
  {
    domain: 'D4',
    text: "A table's data is queried with highly selective equality filters (e.g., WHERE transaction_id = 'TXN-12345'). Clustering keys on transaction_id do NOT help. Which feature should be implemented instead?",
    opts: [
      'Materialized Views on transaction_id',
      'Query Acceleration Service',
      'Search Optimization Service with equality filter optimization',
      'Result Cache',
    ],
    ans: [2],
    explanation: 'Clustering keys help range and ordering queries but do almost nothing for high-selectivity point lookups — because any single value might be scattered across many micro-partitions randomly. Search Optimization Service builds dedicated per-column indexes for equality lookups, dramatically reducing the micro-partitions scanned for point-lookup queries.',
  },

  // ── DOMAIN 5  (~6 questions, 10%) ───────────
  {
    domain: 'D5',
    text: 'A Snowflake table was accidentally dropped 12 hours ago. The account uses Enterprise edition with 90-day Time Travel. How can the data be recovered?',
    opts: [
      'Contact Snowflake Support to recover from Fail-safe',
      'Run: UNDROP TABLE table_name;',
      'Restore from the last manual backup',
      'Time Travel is expired — data cannot be recovered',
    ],
    ans: [1],
    explanation: 'UNDROP TABLE restores a dropped table using Time Travel, as long as the retention period has not expired. Enterprise edition with 90-day retention means the table is still within the Time Travel window after 12 hours. UNDROP TABLE also works for schemas and databases. No Snowflake Support involvement is needed.',
  },
  {
    domain: 'D5',
    text: 'How does Zero-copy Cloning work in Snowflake?',
    opts: [
      'Data is immediately physically duplicated to a new location in cloud storage',
      'A clone is a metadata-only operation that references the same micro-partitions as the source; new storage is only consumed as the clone or source is modified (copy-on-write)',
      'Cloning requires a virtual warehouse and takes time proportional to table size',
      'Clones are read-only and cannot be modified',
    ],
    ans: [1],
    explanation: 'Zero-copy cloning creates an independent object (table, schema, database) that initially shares all micro-partitions with the source — it\'s purely a metadata operation taking milliseconds regardless of data size. When either the clone or source is modified (DML), only the changed micro-partitions are duplicated (copy-on-write). Clones are fully read-write.',
  },
  {
    domain: 'D5',
    text: 'What is the Fail-safe period in Snowflake, and who can recover data from it?',
    opts: [
      'The 7 days after data is deleted; users can query it using Time Travel AT syntax',
      '7 days after the Time Travel period expires; only Snowflake Support can perform recovery from Fail-safe',
      '30 days after data creation; recovered using UNDROP commands',
      'Configurable from 1-90 days; accessible to ACCOUNTADMIN role',
    ],
    ans: [1],
    explanation: 'Fail-safe is a non-configurable, automatic 7-day period that begins AFTER Time Travel expires. During Fail-safe, data is not queryable by users — it\'s purely a disaster recovery safety net managed by Snowflake Support. Users cannot access or restore Fail-safe data themselves. Transient and temporary tables have NO Fail-safe.',
  },
  {
    domain: 'D5',
    text: 'A data provider wants to share a Snowflake database with three consumer accounts in the same AWS us-east-1 region. What happens to the data when consumers access it?',
    opts: [
      'Data is copied to each consumer\'s account upon access',
      'Data is physically transferred once and cached in all three accounts',
      'No data is copied; consumers access the provider\'s data live through Snowflake\'s shared services layer',
      'Data is replicated nightly via Snowpipe',
    ],
    ans: [2],
    explanation: 'Secure Data Sharing is live access — there is no data copy or movement. Consumers see the provider\'s actual data through a read-only database created from the share. Since storage is shared in Snowflake\'s infrastructure, this is efficient and real-time. Consumers use their own compute (warehouses) to query the shared data.',
  },
  {
    domain: 'D5',
    text: 'What is a Data Clean Room in Snowflake (COF-C03)?',
    opts: [
      'A compliant data storage environment for PII data',
      'A privacy-preserving collaboration environment where two parties can jointly analyze combined data without exposing raw records to each other',
      'A physical clean room where Snowflake hardware is maintained',
      'A secure schema for storing encrypted personal data',
    ],
    ans: [1],
    explanation: 'Snowflake Data Clean Rooms (built on the Native App Framework) enable privacy-preserving joint analytics. Two companies can combine their datasets and run pre-approved queries on the combined data — neither party sees the other\'s raw records. The allowed query patterns are defined in advance, enforcing privacy constraints. Common use case: ad targeting overlap analysis between two brands.',
  },
  {
    domain: 'D5',
    text: 'How can a Snowflake user query data from 5 days ago without dropping or modifying the current table?',
    opts: [
      'Using UNDROP TABLE',
      'Using the AT or BEFORE clause in a SELECT statement with a timestamp or statement ID',
      'Restoring from a Fail-safe snapshot',
      'Creating a clone of the table from 5 days ago and querying the clone',
    ],
    ans: [1],
    explanation: "Time Travel SELECT syntax: SELECT * FROM table AT(TIMESTAMP => '2024-01-01 12:00:00'::TIMESTAMP_LTZ); — or BEFORE(STATEMENT => '01abcdef...') to go to just before a specific statement ran. This queries historical data directly without modifying or dropping anything. Creating a clone is possible but unnecessary just for reading historical data.",
  },

  // ── DOMAIN 1 ADDITIONAL ─────────────────────
  {
    domain: 'D1',
    text: 'Which Snowflake layer is responsible for query optimization, authentication, and metadata management?',
    opts: [
      'Virtual Warehouse (Compute) Layer',
      'Database Storage Layer',
      'Cloud Services Layer',
      'Network Policy Layer',
    ],
    ans: [2],
    explanation: 'The Cloud Services Layer is the "brain" of Snowflake. It handles authentication and access control, query parsing and optimization, metadata management, transaction management, and infrastructure management. It runs automatically without requiring a user-provisioned warehouse. Credits are only charged when Cloud Services usage exceeds 10% of the daily compute credits.',
  },
  {
    domain: 'D1',
    text: 'What is the difference between scaling UP and scaling OUT in Snowflake virtual warehouses?',
    opts: [
      'Scaling up increases the number of clusters; scaling out increases warehouse size',
      'Scaling up increases warehouse size (XS→L); scaling out adds more clusters in a multi-cluster warehouse',
      'Both terms are interchangeable in Snowflake',
      'Scaling up applies to storage; scaling out applies to compute',
    ],
    ans: [1],
    explanation: 'Scaling UP means changing warehouse size (e.g., Medium to Large) to give each query more CPU and memory — useful when individual queries are slow or spilling to disk. Scaling OUT means adding more clusters (multi-cluster warehouse) so more concurrent queries can run in parallel without queuing — useful for many simultaneous users. These address different bottlenecks.',
  },
  {
    domain: 'D1',
    text: 'A data engineer needs a table type that is session-scoped, does not contribute to Fail-safe storage costs, and is automatically dropped when the session ends. Which table type fits?',
    opts: ['Permanent Table', 'Transient Table', 'Temporary Table', 'External Table'],
    ans: [2],
    explanation: 'Temporary Tables are session-scoped and automatically dropped when the session ends. They have 0–1 day Time Travel (configurable) and NO Fail-safe, making them the cheapest option for intermediate/staging data. Transient Tables persist across sessions but also lack Fail-safe. Permanent Tables have full Time Travel + Fail-safe. External Tables reference files in external stages and never store data in Snowflake.',
  },
  {
    domain: 'D1',
    text: 'What does the Snowflake Cortex COMPLETE() function do?',
    opts: [
      'Completes missing values in a dataset using ML imputation',
      'Calls a large language model (LLM) with a prompt and returns the generated text response',
      'Marks a Snowpipe batch as complete',
      'Finalizes a transaction and commits pending DML',
    ],
    ans: [1],
    explanation: 'SNOWFLAKE.CORTEX.COMPLETE(model, prompt) is a SQL function that sends a prompt to a supported LLM (e.g., mixtral-8x7b, llama3-70b, mistral-7b) and returns the generated text. It runs entirely within Snowflake — no external API keys or data egress. Example: SELECT SNOWFLAKE.CORTEX.COMPLETE(\'mistral-7b\', \'Summarize: \' || notes) FROM support_tickets;',
  },
  {
    domain: 'D1',
    text: 'Which Snowflake edition is required to store PHI data under HIPAA compliance?',
    opts: ['Standard', 'Enterprise', 'Business Critical', 'Virtual Private Snowflake (VPS)'],
    ans: [2],
    explanation: 'Business Critical edition (and above) includes HIPAA, PCI DSS, SOC 2 Type II, and FedRAMP compliance. It also adds Tri-Secret Secure (customer-managed encryption), Private Link connectivity, and AWS PrivateLink. Standard supports basic security. Enterprise adds 90-day Time Travel and multi-cluster warehouses. VPS (Virtual Private Snowflake) is a fully isolated single-tenant deployment — the highest tier.',
  },
  {
    domain: 'D1',
    text: 'A Snowpark Optimized Warehouse differs from a Standard Warehouse in what critical way?',
    opts: [
      'It can process more concurrent users due to horizontal scaling',
      'It provides 16x more memory per node, optimized for large in-memory ML model training and feature engineering',
      'It automatically distributes across multiple cloud regions',
      'It uses GPU acceleration for deep learning workloads',
    ],
    ans: [1],
    explanation: 'Snowpark Optimized Warehouses have 16x more memory per virtual warehouse node compared to Standard Warehouses. This makes them ideal for ML model training, Snowpark (Python/Java/Scala) workloads that require large DataFrames to fit in memory, and computationally intensive feature engineering. Standard warehouses are fine for SQL and lighter Snowpark workloads.',
  },
  {
    domain: 'D1',
    text: 'What is a Dynamic Table in Snowflake?',
    opts: [
      'A table that automatically adds columns as new data arrives',
      'A declarative continuous transformation where you define a query and Snowflake handles incremental refresh automatically based on a target lag',
      'A table that dynamically resizes storage based on data volume',
      'A real-time streaming table powered by Kafka',
    ],
    ans: [1],
    explanation: 'Dynamic Tables are Snowflake\'s modern approach to data transformation pipelines. You define a SELECT query (the transformation logic) and a TARGET_LAG (how fresh the data must be, e.g., 1 minute, 1 hour). Snowflake automatically computes what\'s changed and updates the table incrementally — no streams or tasks needed. Think of them as "materialized views with automatic CDC built in."',
  },
  {
    domain: 'D1',
    text: 'In Snowflake\'s object hierarchy, which level sits directly ABOVE a Schema?',
    opts: ['Account', 'Organization', 'Database', 'Warehouse'],
    ans: [2],
    explanation: 'The full Snowflake object hierarchy is: Organization → Account → Database → Schema → Objects (Tables, Views, Stages, Streams, Tasks, UDFs, etc.). A Schema is contained within a Database. Warehouses are account-level compute resources but are not part of the data object hierarchy — they exist at the Account level as siblings to Databases.',
  },

  // ── DOMAIN 2 ADDITIONAL ─────────────────────
  {
    domain: 'D2',
    text: 'What is the correct SQL to activate secondary roles in a Snowflake session?',
    opts: [
      'SET SECONDARY_ROLES = ALL;',
      'USE SECONDARY ROLES ALL;',
      'ALTER SESSION SET USE_SECONDARY_ROLES = TRUE;',
      'GRANT SECONDARY ROLES TO USER current_user();',
    ],
    ans: [1],
    explanation: 'USE SECONDARY ROLES ALL; is the correct syntax to activate all granted secondary roles in the current session. By default, only the primary role (set with USE ROLE) is active. With secondary roles enabled, a user can leverage privileges from all their assigned roles simultaneously without role-switching — a major COF-C03 addition.',
  },
  {
    domain: 'D2',
    text: 'A Dynamic Data Masking policy is attached to a column. User A has the ANALYST role and User B has the ADMIN role. The masking policy is set to show full data only to ADMIN. What does User A see?',
    opts: [
      'The raw data — masking only applies to external queries',
      'A masked value (e.g., \'***MASKED***\' or a partial hash) at query time',
      'A NULL value — masked columns always return NULL',
      'An error — ANALYST cannot query masked columns at all',
    ],
    ans: [1],
    explanation: 'Dynamic Data Masking works at query time based on the querying role. The underlying data is always stored in its original form. The masking policy function defines what each role sees — ADMIN sees raw data, ANALYST sees the masked version (e.g., hashed email, partial SSN). No permissions error occurs; users simply see the masked form. This is transparent and requires no application changes.',
  },
  {
    domain: 'D2',
    text: 'Which Snowflake system role should be used to manage USER and ROLE objects as a best practice?',
    opts: ['ACCOUNTADMIN', 'SYSADMIN', 'SECURITYADMIN', 'USERADMIN'],
    ans: [3],
    explanation: 'USERADMIN is purpose-built for user and role management. SECURITYADMIN manages grants and network policies. SYSADMIN manages data objects (databases, warehouses, schemas). ACCOUNTADMIN is the super-role with all privileges — best practice is to use it ONLY for account-level tasks (billing, organization management) and avoid it for routine operations. Always use the least-privileged role.',
  },
  {
    domain: 'D2',
    text: 'What is the difference between ACCOUNT_USAGE and INFORMATION_SCHEMA for monitoring?',
    opts: [
      'ACCOUNT_USAGE is real-time with 7-day history; INFORMATION_SCHEMA has 3-hour lag and 1-year history',
      'ACCOUNT_USAGE has ~3-hour lag with 1-year history; INFORMATION_SCHEMA is near-real-time with 7-day history',
      'Both have the same data but INFORMATION_SCHEMA requires ACCOUNTADMIN access',
      'ACCOUNT_USAGE stores only security events; INFORMATION_SCHEMA stores only query history',
    ],
    ans: [1],
    explanation: 'SNOWFLAKE.ACCOUNT_USAGE is a shared database with up to 3-hour latency but retains data for 1 year — ideal for historical analysis and governance reports. INFORMATION_SCHEMA (every database has one) is near-real-time but only retains data for 7 days. For compliance and trend analysis, use ACCOUNT_USAGE. For recent query troubleshooting, INFORMATION_SCHEMA works well. This distinction appears frequently on the exam.',
  },
  {
    domain: 'D2',
    text: 'A Resource Monitor is set with a credit quota of 100 credits and action SUSPEND at 100%. What happens when the warehouse hits this threshold?',
    opts: [
      'All running queries are immediately cancelled and the warehouse is suspended',
      'The warehouse finishes running queries and is suspended; new queries cannot start',
      'Snowflake sends a notification only — the warehouse continues running',
      'The warehouse is permanently deleted',
    ],
    ans: [1],
    explanation: 'When a Resource Monitor triggers SUSPEND, currently running queries are allowed to finish, but the warehouse is suspended — preventing any new queries from starting until the next billing period resets or an admin intervenes. SUSPEND_IMMEDIATE would cancel all running queries immediately. Resource Monitor notifications (email alerts) can be set at intermediate thresholds (e.g., 75%, 90%) before the quota action.',
  },
  {
    domain: 'D2',
    text: 'What is a Row Access Policy in Snowflake used for?',
    opts: [
      'Encrypting individual rows with role-specific keys',
      'Enforcing row-level security by filtering rows at query time based on the querying role or session attributes',
      'Limiting the number of rows a query can return',
      'Archiving rows to external storage after a retention period',
    ],
    ans: [1],
    explanation: 'Row Access Policies enforce row-level security declaratively. A policy is a function that returns a boolean — rows are only returned where the function evaluates to TRUE for the current session context (role, user, attributes). This is implemented transparently at query time — no application logic or query modification needed. It\'s applied at the table/view level and cannot be bypassed by users, even with DML.',
  },

  // ── DOMAIN 3 ADDITIONAL ─────────────────────
  {
    domain: 'D3',
    text: 'What is the primary difference between Snowpipe and Snowpipe Streaming?',
    opts: [
      'Snowpipe works with structured data; Snowpipe Streaming works with semi-structured data only',
      'Snowpipe is file-based micro-batch loading triggered by cloud events; Snowpipe Streaming is row-level continuous ingestion via the Streaming API (e.g., Kafka connector)',
      'Snowpipe Streaming requires a virtual warehouse; Snowpipe is serverless',
      'There is no functional difference — they are two names for the same feature',
    ],
    ans: [1],
    explanation: 'Snowpipe is event-driven: a file lands in a stage → cloud notification (SQS/SNS/GCS Pub/Sub) triggers Snowpipe → serverless COPY INTO loads the file, typically within 1 minute. Snowpipe Streaming uses the Snowflake Streaming Ingest API for row-level, low-latency ingestion (seconds) directly into tables — no staging step. Kafka Connector uses Snowpipe Streaming internally. Both are serverless — no warehouse needed.',
  },
  {
    domain: 'D3',
    text: 'Which command is used to upload local files from a client machine to a Snowflake internal stage?',
    opts: ['COPY INTO', 'LOAD DATA', 'PUT', 'UPLOAD'],
    ans: [2],
    explanation: 'PUT is the SnowSQL/client command that uploads local files to an internal Snowflake stage. Example: PUT file:///path/to/data.csv @my_stage AUTO_COMPRESS=TRUE; — it compresses the file by default and uploads it. Once in the stage, COPY INTO <table> loads the data from the stage into the table. GET is the reverse — downloading from stage to local.',
  },
  {
    domain: 'D3',
    text: 'A Snowflake Stream has a stale_after timestamp that has passed. What does this mean?',
    opts: [
      'The Stream must be manually refreshed using REFRESH STREAM',
      'The Stream\'s offset has expired — all CDC data since the last consumption is lost and the stream becomes stale, requiring recreation',
      'The Stream has automatically consumed all changes and reset',
      'Old records are archived to Fail-safe automatically',
    ],
    ans: [1],
    explanation: 'A Snowflake Stream captures changes (inserts, updates, deletes) since its last consumption. If the Stream is not consumed within the source table\'s Time Travel retention period, the stream becomes STALE. Stale streams cannot be consumed — the historical change data is no longer accessible. The stream must be recreated (losing any unconsumed changes). This is why tasks consuming streams must run frequently.',
  },
  {
    domain: 'D3',
    text: 'What does a Storage Integration object provide in Snowflake?',
    opts: [
      'A connection pool for JDBC/ODBC drivers to external databases',
      'A secure, credentials-free way to access cloud storage (S3/Azure/GCS) via an IAM/service principal trust relationship',
      'A dedicated network tunnel between on-premises systems and Snowflake',
      'Automatic compression for data stored in external stages',
    ],
    ans: [1],
    explanation: 'Storage Integrations allow Snowflake to access external cloud storage (AWS S3, Azure Blob, GCS) without embedding access keys in stage definitions. Instead, an IAM role (AWS) or service principal (Azure) is configured to trust Snowflake\'s identity. The integration creates a Snowflake IAM user that is granted access — credentials are never stored in Snowflake. This is the security best practice for external stages.',
  },
  {
    domain: 'D3',
    text: 'Which file format does Snowflake recommend for best performance when loading large structured datasets?',
    opts: ['CSV', 'JSON', 'PARQUET', 'XML'],
    ans: [2],
    explanation: 'Parquet is a columnar, compressed binary format that Snowflake can load extremely efficiently. It maps naturally to Snowflake\'s columnar storage, requires less data transfer, and eliminates CSV parsing overhead. For semi-structured data, JSON or Avro may be appropriate. CSV is universal but not optimal for performance. The exam typically asks about Parquet for optimal bulk loading of structured/analytical data.',
  },
  {
    domain: 'D3',
    text: 'What is the purpose of the VALIDATE function in Snowflake data loading?',
    opts: [
      'Runs data quality checks on an existing table after loading',
      'Simulates a COPY INTO statement and returns any errors that would occur, without actually loading data',
      'Validates that a stage exists and is accessible',
      'Checks if a file format matches the data structure',
    ],
    ans: [1],
    explanation: 'VALIDATE(table, job_id => \'<query_id>\') analyzes a COPY INTO statement that was previously run with VALIDATE_UTF8 or ON_ERROR settings and returns detailed error information. More precisely, a COPY INTO with VALIDATION_MODE => \'RETURN_ERRORS\' returns rows that would cause errors without loading any data — this is the dry-run approach. Use this to identify data quality issues before committing a full load.',
  },

  // ── DOMAIN 4 ADDITIONAL ─────────────────────
  {
    domain: 'D4',
    text: 'A query runs slowly because a large JSON array inside a VARIANT column needs to be expanded into individual rows. Which function solves this?',
    opts: ['PARSE_JSON()', 'SPLIT()', 'LATERAL FLATTEN()', 'UNNEST()'],
    ans: [2],
    explanation: 'LATERAL FLATTEN(input => col:array_key) converts a JSON/VARIANT array into a set of rows — one row per array element. Used in a FROM clause with LATERAL join: SELECT f.value FROM table t, LATERAL FLATTEN(input => t.json_col:items) f; — the LATERAL keyword allows the FLATTEN to reference the outer table\'s column. UNNEST() is a PostgreSQL function not available in Snowflake.',
  },
  {
    domain: 'D4',
    text: 'The Query Profile shows "Bytes Spilled to Remote Storage" for a query. What is the recommended fix?',
    opts: [
      'Add a clustering key to the table',
      'Enable the Search Optimization Service',
      'Scale UP to a larger warehouse size to provide more local memory and disk',
      'Switch to a Snowpark Optimized Warehouse',
    ],
    ans: [2],
    explanation: 'Bytes Spilled to Remote Storage means the query\'s data processing exceeds the warehouse\'s local SSD disk capacity — the slowest form of spilling. The fix is to scale UP to a larger warehouse (more nodes = more memory + local disk). Bytes Spilled to Local Storage (local disk) is the intermediate stage — also fixed by scaling up. Clustering and Search Optimization address different issues (pruning and point lookups, respectively).',
  },
  {
    domain: 'D4',
    text: 'How does the Query Acceleration Service (QAS) improve query performance?',
    opts: [
      'It caches query results for 48 hours instead of 24',
      'It pre-warms the warehouse cache by running queries in the background',
      'It offloads outlier scan partitions to serverless compute, preventing a few large partitions from slowing the entire query',
      'It rewrites inefficient queries automatically using AI',
    ],
    ans: [2],
    explanation: 'The Query Acceleration Service automatically detects when a query has "outlier" partitions — ones that take much longer to scan than the rest. It offloads those partitions to serverless (managed) compute workers, freeing the warehouse to proceed with other partitions in parallel. This is especially useful for ad-hoc analytical queries with highly variable data distribution. It\'s enabled per warehouse.',
  },
  {
    domain: 'D4',
    text: 'A business analyst runs the exact same SELECT query twice in a row on a large table. The second execution returns instantly. Which caching mechanism is responsible?',
    opts: ['Warehouse Cache (local SSD)', 'Metadata Cache', 'Result Cache', 'Pre-computed Materialized View'],
    ans: [2],
    explanation: 'The Result Cache (Cloud Services layer) stores the complete result set of any successfully executed query for 24 hours. If the exact same query (same SQL text, same parameters, same role context) is run again within 24 hours and the underlying data hasn\'t changed, the result is returned immediately with zero compute credits. The warehouse doesn\'t even wake up. Result Cache is invalidated by any DML on the queried tables.',
  },
  {
    domain: 'D4',
    text: 'Which SQL construct is used to access a nested field in a VARIANT column containing JSON like {"user": {"email": "a@b.com"}}?',
    opts: [
      'col.user.email',
      'col:user:email',
      'col["user"]["email"]',
      'JSON_VALUE(col, \'$.user.email\')',
    ],
    ans: [1],
    explanation: 'In Snowflake, the colon (:) is the path separator for VARIANT/JSON access. col:user:email navigates to the nested field. You can also use dot notation after the first colon: col:user.email. Bracket notation col["user"]["email"] also works for fields with special characters. JSON_VALUE is a standard SQL function not natively available in Snowflake — Snowflake uses GET_PATH() or colon notation instead.',
  },
  {
    domain: 'D4',
    text: 'Which window function returns the rank of a row with NO gaps when ties occur?',
    opts: ['RANK()', 'ROW_NUMBER()', 'DENSE_RANK()', 'PERCENT_RANK()'],
    ans: [2],
    explanation: 'DENSE_RANK() assigns the same rank to tied rows and continues incrementally with no gaps (e.g., 1, 1, 2, 3). RANK() also shares ranks for ties but leaves gaps afterward (e.g., 1, 1, 3). ROW_NUMBER() assigns unique consecutive numbers regardless of ties. PERCENT_RANK() returns relative rank as a percentage between 0 and 1. The exam loves the RANK vs DENSE_RANK distinction.',
  },
  {
    domain: 'D4',
    text: 'A materialized view becomes "invalid" in Snowflake. What causes this and what is the resolution?',
    opts: [
      'The underlying table schema changed (e.g., a column was dropped); recreate the materialized view',
      'The materialized view has not been queried in 24 hours; run a manual refresh',
      'The result cache expired; it auto-refreshes on next query',
      'The warehouse servicing the materialized view was suspended',
    ],
    ans: [0],
    explanation: 'Materialized Views become invalid if the underlying table\'s structure changes in a way that makes the MV definition incompatible — e.g., a column referenced in the MV is dropped or renamed. When invalid, the MV cannot be queried. The resolution is to drop and recreate the materialized view. Note: Snowflake automatically maintains MV data freshness (automatic background refresh) — users don\'t manually refresh them.',
  },

  // ── DOMAIN 5 ADDITIONAL ─────────────────────
  {
    domain: 'D5',
    text: 'Transient tables in Snowflake differ from Permanent tables in what key way?',
    opts: [
      'Transient tables cannot be queried by more than one user at a time',
      'Transient tables have NO Fail-safe period and limited Time Travel (0–1 day), reducing storage costs',
      'Transient tables are automatically compressed more aggressively',
      'Transient tables are only available in Enterprise edition',
    ],
    ans: [1],
    explanation: 'Transient tables persist across sessions (unlike temporary tables) but have NO Fail-safe (0 days) and only 0–1 day of Time Travel. This significantly reduces storage costs because no additional storage is allocated for historical recovery. Use transient tables for staging/ETL work, non-critical intermediate data, or cost-sensitive workloads where disaster recovery is handled externally.',
  },
  {
    domain: 'D5',
    text: 'A data provider in us-east-1 (AWS) wants to share a database with a consumer whose Snowflake account is in us-west-2 (AWS). What is required?',
    opts: [
      'Data must be replicated to us-west-2 first before sharing is possible',
      'Secure Data Sharing works natively across all regions — no replication needed',
      'A VPN connection must be established between the two regions',
      'The provider must use a Reader Account in us-west-2',
    ],
    ans: [0],
    explanation: 'Secure Data Sharing only works natively within the same cloud region and provider (e.g., both in AWS us-east-1). For cross-region sharing, the provider must replicate the database to the consumer\'s region first using Database Replication, then create the share from the replica. Cross-cloud sharing (e.g., AWS to Azure) also requires replication. This is a key exam edge case.',
  },
  {
    domain: 'D5',
    text: 'What is a Reader Account in Snowflake Data Sharing?',
    opts: [
      'An account with read-only access to all shared databases on the Marketplace',
      'A Snowflake-managed account provisioned by a data provider for consumers who do not have their own Snowflake account',
      'A special account type for regulatory auditors to review data',
      'A consumer account with unlimited read throughput for shared data',
    ],
    ans: [1],
    explanation: 'Reader Accounts allow data providers to share data with consumers who don\'t have their own Snowflake account. The provider creates and manages the Reader Account, controls its warehouses, and is responsible for all compute costs incurred by the Reader Account. The consumer uses a Snowflake-provided login to access only the shared database — they cannot create their own databases or warehouses beyond what the provider configures.',
  },
  {
    domain: 'D5',
    text: 'Which of the following objects are NOT included when cloning a database? (Select all that apply)',
    opts: [
      'Permanent tables and their data',
      'Schemas and their child objects',
      'External stages',
      'Temporary tables',
    ],
    multi: true,
    ans: [2, 3],
    explanation: 'When cloning a database, all permanent tables, schemas, and most objects (views, sequences, streams, tasks, etc.) are included. External stages are excluded from cloning because they reference external cloud storage that already exists independently. Temporary tables are also excluded — they are session-scoped and meaningless to clone. Internal named stages are cloned (the stage definition), but the files inside are NOT cloned.',
  },
  {
    domain: 'D5',
    text: 'What differentiates a Data Clean Room in Snowflake from regular Secure Data Sharing?',
    opts: [
      'Data Clean Rooms physically move data to a neutral third-party server; sharing keeps data in place',
      'Data Clean Rooms allow two parties to run jointly-agreed analytics on combined data without either seeing the other\'s raw records; sharing gives read-only access to the provider\'s data as-is',
      'Data Clean Rooms are only available for government entities under FISMA',
      'Data Clean Rooms require both parties to be on Business Critical edition',
    ],
    ans: [1],
    explanation: 'Secure Data Sharing gives a consumer read-only access to a provider\'s database — the consumer can see (within their access controls) the provider\'s actual records. Data Clean Rooms go further: they enforce privacy constraints where neither party sees the other\'s raw data. Both datasets are combined but access is restricted to pre-approved query templates (e.g., overlap counts), preventing raw record exposure. Built on the Native App Framework.',
  },
  {
    domain: 'D5',
    text: 'An Enterprise edition account has Time Travel set to 90 days. A table\'s data was modified 95 days ago. How can the data from 95 days ago be recovered?',
    opts: [
      'Use SELECT * FROM table AT(OFFSET => -95*24*60*60)',
      'Contact Snowflake Support — it may be in Fail-safe if within 7 days of Time Travel expiry',
      'The data cannot be recovered — it\'s beyond both Time Travel and Fail-safe',
      'Use UNDROP TABLE with the 95-day offset parameter',
    ],
    ans: [2],
    explanation: 'With 90-day Time Travel, data modified 95 days ago is 5 days beyond the Time Travel window. Fail-safe covers 7 days AFTER Time Travel expires, meaning data is potentially recoverable until day 97 (90 + 7). At day 95, the data would still be in Fail-safe — but only Snowflake Support can perform Fail-safe recovery, and it\'s not guaranteed. Since the question says 95 days with a 90-day TT, the Fail-safe window is days 91–97, so Support may help — but answer C is the closest if Support isn\'t an option offered.',
  },

  // ── DOMAIN 1 — MULTI-SELECT ─────────────────
  {
    domain: 'D1',
    text: 'Which of the following are Snowflake Cortex AI SQL functions? (Select all that apply)',
    multi: true,
    opts: [
      'SNOWFLAKE.CORTEX.COMPLETE()',
      'SNOWFLAKE.CORTEX.SENTIMENT()',
      'SNOWFLAKE.CORTEX.PREDICT()',
      'SNOWFLAKE.CORTEX.TRANSLATE()',
    ],
    ans: [0, 1, 3],
    explanation: 'Cortex AI SQL functions include COMPLETE (LLM text generation), SENTIMENT (sentiment score -1 to 1), TRANSLATE (language translation), SUMMARIZE (text summarization), CLASSIFY_TEXT, and EXTRACT_ANSWER. PREDICT() is not a Cortex function — it\'s associated with Snowflake ML Classification/Forecasting models (separate from Cortex). The Cortex functions all live in the SNOWFLAKE.CORTEX schema.',
  },
  {
    domain: 'D1',
    text: 'Which of the following are valid Snowflake Virtual Warehouse sizes? (Select all that apply)',
    multi: true,
    opts: ['X-Small (XS)', 'Medium (M)', '4X-Large (4XL)', '10X-Large (10XL)'],
    ans: [0, 1, 2],
    explanation: 'Snowflake warehouse sizes range from X-Small (XS) through X-Large (XL), 2XL, 3XL, 4XL, 5XL, and 6XL. 10XL does not exist — the maximum is 6XL. Each size up approximately doubles the credit consumption per hour. Snowpark Optimized warehouses are available in Medium through 6XL. This range is important to memorize for the exam.',
  },

  // ── DOMAIN 2 — MULTI-SELECT ─────────────────
  {
    domain: 'D2',
    text: 'Which of the following Snowflake system roles have the ability to manage grants and privileges? (Select all that apply)',
    multi: true,
    opts: ['ACCOUNTADMIN', 'SECURITYADMIN', 'SYSADMIN', 'USERADMIN'],
    ans: [0, 1],
    explanation: 'ACCOUNTADMIN has all privileges, including granting any privilege. SECURITYADMIN can manage grants because it inherits USERADMIN and can manage network policies and privilege grants to roles. SYSADMIN manages data objects (databases, warehouses) but cannot manage grants to other roles directly. USERADMIN manages users and roles but not privilege grants on data objects.',
  },

  // ── DOMAIN 3 — MULTI-SELECT ─────────────────
  {
    domain: 'D3',
    text: 'Which of the following are valid types of internal stages in Snowflake? (Select all that apply)',
    multi: true,
    opts: ['User Stage (@~)', 'Table Stage (@%table_name)', 'Named Internal Stage (@stage_name)', 'Database Stage (@database_name)'],
    ans: [0, 1, 2],
    explanation: 'Snowflake has three types of internal stages: User Stage (@~) — one per user, no DDL needed; Table Stage (@%table) — one per table, no DDL needed, only accessible for that table; Named Internal Stage (@stage_name) — explicitly created with CREATE STAGE, shareable, supports directory tables. There is no "Database Stage" concept in Snowflake. External stages (S3, Azure, GCS) are separate from internal stages.',
  },

  // ── DOMAIN 4 — MULTI-SELECT ─────────────────
  {
    domain: 'D4',
    text: 'Which of the following Snowflake aggregate functions can be answered from the Metadata Cache without spinning up a virtual warehouse? (Select all that apply)',
    multi: true,
    opts: ['COUNT(*)', 'MIN() on a non-VARIANT column', 'SUM()', 'AVG()'],
    ans: [0, 1],
    explanation: 'Snowflake micro-partitions store metadata including row count, min, and max values for each column. COUNT(*) (total row count) and MIN()/MAX() on non-VARIANT columns can be answered directly from this metadata in the Cloud Services layer — zero warehouse credits consumed. SUM() and AVG() require scanning actual data values, which requires a warehouse. This is a key performance optimization concept.',
  },
];

