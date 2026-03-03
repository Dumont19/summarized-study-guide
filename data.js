/* ═══════════════════════════════════════════════
   SNOWPRO CORE COF-C03 · STUDY HUB
   data.js  —  Study content + exam questions
   ═══════════════════════════════════════════════ */

const DOMAINS = [
  {
    id: 'd1',
    code: 'Domain 1',
    weight: '31%',
    title: 'AI Data Cloud Features & Architecture',
    subdomains: [
      { name: 'Snowflake Architecture', items: ['Cloud Services layer', 'Compute layer', 'Database Storage layer', 'Editions'] },
      { name: 'Interfaces & Tools', items: ['Snowsight', 'Snowflake CLI', 'IDE integrations', 'SnowSQL', 'Snowpark', 'Streamlit'] },
      { name: 'Object Hierarchy', items: ['Organization → Account → Database → Schema → Object'] },
      { name: 'Virtual Warehouses', items: ['Standard (Gen 1 & Gen 2)', 'Snowpark Optimized', 'Sizes', 'Multi-cluster', 'Scaling'] },
      { name: 'Storage Concepts', items: ['Micro-partitions', 'Data clustering', 'Table types', 'View types'] },
      { name: 'AI/ML Features', items: ['Snowflake Cortex', 'Cortex Search', 'Cortex Analyst', 'Snowflake ML', 'Notebooks'] }
    ],
    summary: `Snowflake's architecture separates storage, compute, and cloud services into **three distinct layers** that scale independently. Cloud Services handles metadata and coordination. Compute consists of Virtual Warehouses. Storage uses proprietary micro-partitions. \n\n**COF-C03's biggest addition is AI/ML features.** Snowflake Cortex exposes LLMs via SQL functions. Snowpark lets engineers write Python inside Snowflake. Virtual Warehouses include Standard and Snowpark Optimized.`,
    topics: ['Micro-partitions', 'Cloud Services Layer', 'Virtual Warehouses', 'Snowflake Cortex', 'Snowpark', 'Multi-cluster Warehouses'],
    tips: [
      { text: '<strong>Architecture layers are independently scalable.</strong>' },
      { text: '<strong>Snowpark Optimized</strong> warehouses are for large ML models.' },
      { text: '<strong>Cortex functions are SQL-native.</strong>' }
    ]
  },
  {
    id: 'd2',
    code: 'Domain 2',
    weight: '20%',
    title: 'Account Management & Data Governance',
    subdomains: [
      { name: 'Security & Authentication', items: ['RBAC', 'DAC', 'MFA, SSO', 'System roles', 'Secondary roles'] },
      { name: 'Roles & Privileges', items: ['GRANT', 'Role hierarchy', 'Account vs Database roles'] },
      { name: 'Data Governance', items: ['Dynamic Data Masking', 'Row Access Policies', 'Trust Center', 'Data Lineage'] },
      { name: 'Cost & Monitoring', items: ['Resource Monitors', 'ACCOUNT_USAGE', 'INFORMATION_SCHEMA', 'Snowflake Budgets'] }
    ],
    summary: `Security uses a dual model: RBAC and DAC. COF-C03 introduces Secondary Roles. Data governance includes Privacy Policies and Data Lineage. Trust Center is a centralized security dashboard. Dynamic Data Masking and Row Access Policies enforce security at query time. For cost management, Resource Monitors set credit limits.`,
    topics: ['RBAC', 'Secondary Roles', 'Dynamic Data Masking', 'Row Access Policies', 'Trust Center'],
    tips: [
      { text: '<strong>ACCOUNTADMIN</strong> should never be used for daily ops.' },
      { text: '<strong>Secondary Roles (COF-C03):</strong> <code>USE SECONDARY ROLES ALL;</code>' },
      { text: '<strong>ACCOUNT_USAGE vs INFORMATION_SCHEMA:</strong> 3h lag vs real-time.' }
    ]
  },
  {
    id: 'd3',
    code: 'Domain 3',
    weight: '18%',
    title: 'Data Loading, Unloading & Connectivity',
    subdomains: [
      { name: 'Stages & File Formats', items: ['User, table, internal stages', 'External stages', 'COPY INTO'] },
      { name: 'Loading Commands', items: ['PUT', 'COPY INTO', 'VALIDATE', 'CREATE EXTERNAL TABLE'] },
      { name: 'Automated Ingestion', items: ['Snowpipe', 'Snowpipe Streaming', 'Streams', 'Tasks', 'Dynamic Tables'] },
      { name: 'Connectors & Integrations', items: ['JDBC/ODBC', 'Storage Integrations', 'Git Integration'] }
    ],
    summary: `Data loading revolves around stages. COPY INTO is the bulk loader. Snowpipe vs. Snowpipe Streaming is a critical distinction (micro-batch vs row-level Kafka). Streams provide CDC. Dynamic Tables define a target refresh lag. Git Integration lets you sync repos into Snowflake.`,
    topics: ['Snowpipe', 'Snowpipe Streaming', 'Streams', 'Dynamic Tables', 'Git Integration'],
    tips: [
      { text: '<strong>COPY INTO tracks loaded files</strong> via metadata.' },
      { text: '<strong>Streams consume offset</strong> once read in a successful DML.' }
    ]
  },
  {
    id: 'd4',
    code: 'Domain 4',
    weight: '21%',
    title: 'Performance Optimization',
    subdomains: [
      { name: 'Query Performance', items: ['Query Profile', 'Bytes spilled', 'ACCOUNT_USAGE.QUERY_HISTORY'] },
      { name: 'Optimization', items: ['Clustering keys', 'Search Optimization Service', 'Query Acceleration Service'] },
      { name: 'Caching', items: ['Result Cache', 'Metadata Cache', 'Warehouse Cache'] },
      { name: 'Data Transformation', items: ['Structured', 'Semi-structured (VARIANT)', 'Window functions'] }
    ],
    summary: `Query performance relies on the Query Profile. Bytes spilled implies a larger warehouse is needed. Three caching layers: Result Cache (24h), Metadata Cache (no warehouse), Warehouse Cache (lost on suspend). Clustering Keys reorder partitions. Search Optimization is for point lookups.`,
    topics: ['Query Profile', 'Result Cache', 'Clustering Keys', 'VARIANT'],
    tips: [
      { text: '<strong>Result Cache = 24 hours</strong>, invalidated by DML.' },
      { text: '<strong>LATERAL FLATTEN</strong> turns JSON arrays into rows.' }
    ]
  },
  {
    id: 'd5',
    code: 'Domain 5',
    weight: '10%',
    title: 'Data Collaboration & Protection',
    subdomains: [
      { name: 'Continuous Data Protection', items: ['Time Travel', 'Fail-safe', 'Cloning', 'Replication'] },
      { name: 'Secure Data Sharing', items: ['Provider', 'Consumer', 'Reader Accounts'] },
      { name: 'Marketplace & Collaboration', items: ['Marketplace', 'Data Clean Rooms', 'Native Apps'] }
    ],
    summary: `Data protection relies on Time Travel (0-90 days) and Fail-safe (7 days, support only). Cloning is zero-copy and instant. Secure Data Sharing allows live access without copying. Data Clean Rooms enable privacy-preserving joint analysis.`,
    topics: ['Time Travel', 'Fail-safe', 'Cloning', 'Secure Data Sharing', 'Data Clean Rooms'],
    tips: [
      { text: '<strong>Fail-safe is NOT queryable by users</strong>.' },
      { text: '<strong>Cloning creates zero-copy instantly</strong>.' }
    ]
  }
];

const ALL_QUESTIONS = [
  // ── DOMAIN 1 ──────────
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

  // ── DOMAIN 2 ──────────
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

  // ── DOMAIN 3 ──────────
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

  // ── DOMAIN 4 ──────────
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

  // ── DOMAIN 5 ───────────
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

  // ── 10 NOVAS QUESTÕES ADICIONADAS ─────────────────────
  {
    domain: 'D1',
    text: 'A user attempts to query a dynamic table but receives an error stating the table is unreadable. What is the most likely cause?',
    opts: [
      'The dynamic table has not been fully refreshed yet (initial refresh is pending)',
      'The user lacks the ACCOUNTADMIN role',
      'Dynamic tables are write-only objects',
      'The underlying streams have become stale'
    ],
    ans: [0],
    explanation: 'Unlike materialized views, a dynamic table cannot be queried until its initial refresh completes successfully. If it is still initializing or if the initial refresh failed, querying it returns an error.',
  },
  {
    domain: 'D2',
    text: 'Which Snowflake governance feature allows an administrator to track which tags are assigned to which objects across the entire account?',
    opts: [
      'ACCOUNT_USAGE.TAG_REFERENCES',
      'INFORMATION_SCHEMA.TAGS',
      'TRUST_CENTER.TAG_METRICS',
      'Data Lineage UI'
    ],
    ans: [0],
    explanation: 'The TAG_REFERENCES view in the SNOWFLAKE.ACCOUNT_USAGE schema allows administrators to query and audit all tag associations across all databases in the account. INFORMATION_SCHEMA is limited to a single database.',
  },
  {
    domain: 'D4',
    text: 'A query joins two large tables and execution is extremely slow. The Query Profile indicates "Exploding Joins". How should the data engineer resolve this?',
    opts: [
      'Scale up the virtual warehouse to a 4XL',
      'Add a clustering key on the join columns',
      'Enable Query Acceleration Service (QAS)',
      'Rewrite the SQL to fix the join condition, as this indicates a Cartesian product or many-to-many duplication'
    ],
    ans: [3],
    explanation: 'Exploding joins occur when a join produces significantly more rows than the input tables (often due to missing join predicates or unexpected duplicates, creating a Cartesian product). Scaling hardware will not fix bad SQL logic. The query itself must be corrected.',
  },
  {
    domain: 'D3',
    text: 'When configuring Snowpipe Streaming via the Kafka Connector, what Snowflake object is NOT required, unlike standard Snowpipe?',
    opts: [
      'A target table',
      'A virtual warehouse',
      'An internal or external stage',
      'A Snowflake role with INSERT privileges'
    ],
    ans: [2],
    explanation: 'Snowpipe Streaming writes rows directly into Snowflake tables using the Streaming API. It entirely bypasses the need for an intermediate stage (like S3/Azure/GCS or internal stages), which is mandatory for standard Snowpipe.',
  },
  {
    domain: 'D5',
    text: 'Company A wants to share sales data with Company B securely. Company B must NOT be able to see the raw PII data, but must be able to run aggregate analytical queries (e.g., demographic overlap). Which COF-C03 feature is built for this?',
    opts: [
      'Row Access Policies combined with Data Sharing',
      'Snowflake Data Clean Rooms',
      'Reader Accounts with Masking Policies',
      'Zero-Copy Cloning'
    ],
    ans: [1],
    explanation: 'Snowflake Data Clean Rooms are specifically designed for privacy-preserving collaboration. They allow parties to join their data and run pre-approved aggregate queries without exposing the underlying raw records to each other.',
  },
  {
    domain: 'D4',
    text: 'What is a critical difference between a Materialized View and a Dynamic Table in Snowflake?',
    opts: [
      'Materialized views refresh incrementally based on a schedule, while dynamic tables refresh synchronously on query.',
      'Dynamic tables support complex transformations (like JOINs and aggregations across multiple tables), whereas materialized views have strict limitations on joins and aggregations.',
      'Materialized views do not incur compute costs for maintenance, while dynamic tables do.',
      'Dynamic tables cannot be queried directly.'
    ],
    ans: [1],
    explanation: 'Dynamic Tables are designed for complex ETL/ELT data pipelines, supporting multi-table joins and complex aggregations. Materialized Views are designed for transparent query acceleration and have strict restrictions (e.g., no joins, limited aggregations).',
  },
  {
    domain: 'D1',
    text: 'Does data stored in Time Travel incur storage costs?',
    opts: [
      'No, Time Travel storage is free as long as it is within the 90-day window.',
      'Yes, the physical bytes retained for Time Travel historical states are billed at the standard storage rate.',
      'Only for Business Critical accounts.',
      'Yes, but it is billed at a 50% discount compared to active data.'
    ],
    ans: [1],
    explanation: 'Snowflake bills for all physical storage used. If a row is deleted or updated, the old version is kept for the duration of the Time Travel retention period, and this historical data continues to consume storage bytes that are billed at the standard rate.',
  },
  {
    domain: 'D2',
    text: 'How do Network Policies evaluate allowed vs. blocked IP addresses?',
    opts: [
      'Allowed list is evaluated first, then the blocked list.',
      'Blocked list is evaluated first, then the allowed list. If an IP is in both, it is blocked.',
      'Only the allowed list matters; the blocked list is ignored.',
      'Network policies only apply to JDBC/ODBC connections, not the web interface.'
    ],
    ans: [1],
    explanation: 'When evaluating a Network Policy, Snowflake checks the blocked IP list first. If the IP is blocked, access is denied immediately. If it is not blocked, it checks the allowed list. If it is in the allowed list, access is granted. Therefore, if an IP is in both lists, it is blocked.',
  },
  {
    domain: 'D3',
    text: 'How is Snowpipe billed when it auto-ingests data?',
    opts: [
      'It consumes credits from the default virtual warehouse of the user who created the pipe.',
      'It is billed based on a fixed monthly subscription.',
      'It uses serverless compute and bills per-second for the compute used, plus a per-file charge.',
      'It is completely free if the data volume is under 1TB per day.'
    ],
    ans: [2],
    explanation: 'Snowpipe uses Snowflake-managed serverless compute, not user-managed virtual warehouses. You are billed based on the compute time used (per-second) to load the files, plus a small overhead charge per file (for file management metadata).',
  },
  {
    domain: 'D5',
    text: 'When replicating a database to a secondary Snowflake account for disaster recovery, what happens to external stages?',
    opts: [
      'External stages are fully replicated, including the data in S3/Azure/GCS.',
      'External stages are replicated, but the underlying cloud storage data is NOT copied by Snowflake.',
      'External stages cause the replication job to fail.',
      'External stages are converted to internal stages in the target account.'
    ],
    ans: [1],
    explanation: 'Database replication copies the metadata (the stage definition). However, because an external stage merely points to an external cloud storage location (like an S3 bucket), Snowflake does NOT replicate the files sitting in that external bucket. Both the primary and secondary accounts will simply point to the same external bucket.',
  },
  {
    domain: 'D1',
    text: 'Qual serviço do Snowflake permite que desenvolvedores criem e implantem aplicações interativas diretamente no Snowflake usando Python?',
    opts: ['Snowpark Optimized', 'Streamlit in Snowflake', 'Snowflake CLI', 'Dynamic Tables'],
    ans: [1],
    explanation: 'O Streamlit in Snowflake permite transformar scripts Python em apps interativas que rodam com a segurança e escala do Snowflake.',
  },
  {
    domain: 'D2',
    text: 'A "Privacy Policy" no Snowflake é usada principalmente para:',
    opts: ['Criptografar arquivos no estágio', 'Definir como categorias de dados sensíveis devem ser tratadas e auditadas', 'Pagar faturas pendentes', 'Gerenciar roles de SYSADMIN'],
    ans: [1],
    explanation: 'Novidade da COF-C03, as Privacy Policies ajudam na governança de dados sensíveis.',
  },
  {
    domain: 'D4',
    text: 'O que indica a métrica "Partitions Scanned" no Query Profile?',
    opts: ['O número de usuários na query', 'A eficiência do "pruning" de metadados', 'O tamanho do arquivo JSON', 'A quantidade de memória RAM usada'],
    ans: [1],
    explanation: 'Se o "Scanned" for muito menor que o "Total", o Snowflake está eliminando dados irrelevantes com sucesso.',
  },
  {
    domain: 'D3',
    text: 'Ao usar o comando COPY INTO, qual parâmetro permite carregar dados mesmo se o arquivo já tiver sido carregado antes?',
    opts: ['ON_ERROR = CONTINUE', 'FORCE = TRUE', 'PURGE = TRUE', 'STRIP_OUTER_ARRAY'],
    ans: [1],
    explanation: 'O Snowflake rastreia o histórico de carga por 64 dias. FORCE=TRUE ignora esse histórico.',
  },
  {
    domain: 'D5',
    text: 'Qual o papel do "Provider" em uma estrutura de Data Sharing?',
    opts: ['Pagar pelos créditos de consulta do consumidor', 'Criar o "Share" e garantir acesso aos objetos originais na sua conta', 'Copiar os dados para a conta do consumidor', 'Gerenciar os usuários do consumidor'],
    ans: [1],
    explanation: 'O provedor detém o dado e paga pelo armazenamento; o compartilhamento é apenas via metadados.',
  },
  {
    domain: 'D1',
    text: 'O Snowflake Marketplace oferece acesso a:',
    opts: ['Apenas tabelas de demonstração', 'Dados de terceiros, modelos de IA e Native Apps prontos para uso', 'Código fonte do Snowflake', 'Hardware de servidores'],
    ans: [1],
    explanation: 'O Marketplace evoluiu para incluir aplicações (Native Apps) e modelos de IA além de dados.',
  },
  {
    domain: 'D2',
    text: 'A visão ACCESS_HISTORY no esquema ACCOUNT_USAGE é útil para:',
    opts: ['Ver o tempo de login', 'Auditar quais colunas e tabelas específicas foram lidas por quais usuários', 'Criar novos warehouses', 'Configurar SSO'],
    ans: [1],
    explanation: 'É a ferramenta definitiva para linhagem de dados e auditoria de segurança granular.',
  },
  {
    domain: 'D3',
    text: 'O "Storage Integration" é um objeto de nível de:',
    opts: ['Banco de Dados', 'Esquema', 'Conta (Account)', 'Tabela'],
    ans: [2],
    explanation: 'Integrations são objetos globais da conta para segurança centralizada.',
  },
  {
    domain: 'D4',
    text: 'A função SNOWFLAKE.CORTEX.SUMMARIZE() retorna:',
    opts: ['A soma de uma coluna numérica', 'Um resumo em texto de um documento ou campo de texto longo', 'A média de valores nulos', 'O total de linhas da tabela'],
    ans: [1],
    explanation: 'É uma função de IA (LLM) para processamento de linguagem natural.',
  },
  {
    domain: 'D5',
    text: 'Clonar um banco de dados que possui tabelas permanentes resulta em tabelas clonadas de qual tipo?',
    opts: ['Temporárias', 'Transientes', 'Permanentes', 'Externas'],
    ans: [2],
    explanation: 'Clones de tabelas permanentes mantêm o tipo permanente (com Time Travel e Fail-safe).',
  },
  {
    domain: 'D1',
    text: 'O "Cloud Services Layer" executa qual destas ações?',
    opts: ['Armazenar os dados em disco', 'Gerenciar a segurança e criptografia de ponta a ponta', 'Realizar joins de tabelas massivas', 'Hospedar o servidor de BI'],
    ans: [1],
    explanation: 'A camada de serviços gerencia a infraestrutura, incluindo chaves de criptografia.',
  },
  {
    domain: 'D2',
    text: 'Um "Resource Monitor" pode ser configurado para monitorar qual destes consumos?',
    opts: ['Armazenamento em TB', 'Uso de créditos de computação (Warehouses)', 'Número de linhas carregadas', 'Quantidade de usuários ativos'],
    ans: [1],
    explanation: 'Monitores de recurso focam estritamente no custo de computação.',
  },
  {
    domain: 'D3',
    text: 'Qual o formato de arquivo padrão assumido pelo comando COPY INTO se nenhum for especificado?',
    opts: ['JSON', 'CSV', 'PARQUET', 'AVRO'],
    ans: [1],
    explanation: 'O CSV é o "default", exigindo definição explícita para outros formatos.',
  },
  {
    domain: 'D4',
    text: 'O que é "Search Optimization Service" (SOS)?',
    opts: ['Uma forma de buscar usuários na conta', 'Um índice secundário persistente que acelera buscas pontuais em tabelas gigantes', 'Um buscador de arquivos no S3', 'Uma melhoria no cache de resultados'],
    ans: [1],
    explanation: 'SOS cria estruturas de dados extras para acelerar filtros de igualdade em bilhões de linhas.',
  },
  {
    domain: 'D5',
    text: 'O "Fail-safe" protege os dados contra:',
    opts: ['Deleções acidentais recuperáveis pelo usuário', 'Desastres catastróficos e corrupção de dados (recuperação via Suporte Snowflake)', 'Acesso não autorizado', 'Lentidão em queries'],
    ans: [1],
    explanation: 'Fail-safe é a última linha de defesa, inacessível ao usuário final.',
  },
  {
    domain: 'D1',
    text: 'Qual a principal diferença entre a edição Enterprise e a Business Critical?',
    opts: ['O Business Critical suporta 90 dias de Time Travel', 'O Business Critical inclui suporte para HIPAA, PCI-DSS e Tri-Secret Secure', 'O Enterprise não tem Multi-cluster', 'Não há diferença'],
    ans: [1],
    explanation: 'Business Critical foca em conformidade regulatória e segurança extrema.',
  },
  {
    domain: 'D2',
    text: 'O papel SYSADMIN tem, por padrão, acesso a todos os dados da conta?',
    opts: ['Sim, ele é o administrador de dados', 'Não, ele só acessa dados de bancos de dados que ele criou ou onde recebeu permissão', 'Sim, ele herda do ACCOUNTADMIN', 'Não, apenas o SECURITYADMIN vê dados'],
    ans: [1],
    explanation: 'No RBAC do Snowflake, privilégios devem ser explicitamente concedidos ou herdados via hierarquia.',
  },
  {
    domain: 'D3',
    text: 'O Snowpipe consome créditos de qual warehouse?',
    opts: ['Do warehouse padrão do usuário', 'De um pool de recursos serverless gerenciado pelo Snowflake', 'Do warehouse do SYSADMIN', 'O Snowpipe não consome créditos'],
    ans: [1],
    explanation: 'Snowpipe é serverless; o faturamento é baseado no uso real de computação da infraestrutura compartilhada.',
  },
  {
    domain: 'D4',
    text: 'Qual função SQL permite extrair todos os níveis de um JSON em colunas separadas?',
    opts: ['EXTRACT()', 'GET_PATH()', 'SPLIT()', 'PARSE_JSON()'],
    ans: [1],
    explanation: 'GET_PATH() ou a notação de dois pontos (:) são os métodos para navegar no VARIANT.',
  },
  {
    domain: 'D5',
    text: 'Em uma clonagem de Banco de Dados, o que acontece com as Tarefas (Tasks)?',
    opts: ['São clonadas e mantêm o estado (Running/Suspended)', 'São clonadas, mas ficam obrigatoriamente suspensas no clone', 'Não são clonadas', 'Tarefas só existem no esquema PUBLIC'],
    ans: [1],
    explanation: 'Para evitar execuções duplicadas acidentais, tarefas clonadas sempre iniciam suspensas.',
  },
  {
    domain: 'D1',
    text: 'Qual o papel da "Organization" em contas Snowflake?',
    opts: ['Gerenciar uma única conta', 'Gerenciar múltiplas contas de forma centralizada, incluindo faturamento e replicação', 'Controlar a rede local', 'Substituir o ACCOUNTADMIN'],
    ans: [1],
    explanation: 'A Organization é o nível mais alto, acima das Contas.',
  },
  {
    domain: 'D2',
    text: 'A política de rede (Network Policy) pode ser aplicada a quais níveis?',
    opts: ['Apenas Conta', 'Conta e Usuários específicos', 'Apenas Bancos de Dados', 'Conta, Warehouses e Tabelas'],
    ans: [1],
    explanation: 'Políticas de rede restringem acesso por IP no nível da conta ou para usuários individuais.',
  },
  {
    domain: 'D3',
    text: 'No comando COPY INTO, a opção ON_ERROR = SKIP_FILE faz o quê?',
    opts: ['Pula a linha com erro e continua', 'Interrompe a carga no primeiro erro', 'Ignora o arquivo inteiro se ele contiver qualquer erro', 'Deleta o arquivo do estágio'],
    ans: [2],
    explanation: 'Garante que apenas arquivos 100% limpos entrem na tabela.',
  },
  {
    domain: 'D4',
    text: 'O que é o "Metadata Cache"?',
    opts: ['Um cache de resultados de queries', 'Informações sobre arquivos e micro-partições armazenadas na camada de serviços', 'O cache de disco local do warehouse', 'Um backup dos metadados no S3'],
    ans: [1],
    explanation: 'Permite que funções como COUNT(*) não precisem de um warehouse ligado.',
  },
  {
    domain: 'D5',
    text: 'Reader Accounts podem criar suas próprias tabelas permanentes?',
    opts: ['Sim', 'Não, elas são restritas a consumir dados compartilhados pelo provedor', 'Sim, mas apenas via Snowpark', 'Sim, se pagarem a licença'],
    ans: [1],
    explanation: 'Reader accounts são "consumidores puros" de dados do provedor.',
  },
  {
    domain: 'D1',
    text: 'O formato de tabela "Apache Iceberg" no Snowflake permite:',
    opts: ['Criptografar dados com chaves externas', 'Interoperabilidade com ferramentas externas (Spark, Trino) usando armazenamento em nuvem aberto', 'Aumentar o limite de 90 dias do Time Travel', 'Reduzir o custo do Cloud Services'],
    ans: [1],
    explanation: 'É o pilar do "Open Data Lakehouse" no Snowflake.',
  },
  {
    domain: 'D2',
    text: 'Qual visão do INFORMATION_SCHEMA exibe os privilégios concedidos a uma role?',
    opts: ['ROLE_GRANTS', 'TABLE_PRIVILEGES', 'APPLICABLE_ROLES', 'OBJECT_PRIVILEGES'],
    ans: [1],
    explanation: 'Mostra quem pode fazer o quê em quais tabelas.',
  },
  {
    domain: 'D3',
    text: 'O que define o "Snowpipe Streaming"?',
    opts: ['Carregamento de arquivos via S3', 'Ingestão de dados linha a linha (row-level) via API, sem usar arquivos em estágios', 'Transferência de dados entre regiões', 'Visualização de logs em tempo real'],
    ans: [1],
    explanation: 'Ideal para Kafka e cenários de latência ultra-baixa.',
  },
  {
    domain: 'D4',
    text: 'Qual a principal vantagem das Tabelas Dinâmicas (Dynamic Tables)?',
    opts: ['São gratuitas', 'Automatizam a atualização de dados complexos através de um modelo declarativo (SQL)', 'Não usam micro-partições', 'Funcionam apenas em Excel'],
    ans: [1],
    explanation: 'Você define o "estado final" e o Snowflake cuida do pipeline de dados.',
  }
];