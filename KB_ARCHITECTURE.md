# 🧠 KNOWLEDGE BASE - ARCHITECTURE & ENGINEERING
## Maîtrise Technique x1000

---

## 1. ARCHITECTURE MICROSERVICES AVANCÉE

### Patterns Critiques

#### Circuit Breaker Pattern
**Problème :** Cascade failures quand un service dépendant tombe
**Solution :** 
- État CLOSED (normal operation)
- État OPEN (service down, fallback activé)
- État HALF-OPEN (test recovery)
**Implémentation :** Hystrix (Java), Resilience4j, ou custom avec Redis

#### Saga Pattern (Distributed Transactions)
**Problème :** Consistance data cross-services
**Types :**
- **Choreography :** Services émettent des events, autres réagissent
- **Orchestration :** Central coordinator gère le flow
**Use case OMNIA :** Order processing (payment → inventory → shipping)

#### CQRS (Command Query Responsibility Segregation)
**Concept :** Séparer reads et writes
**Benefits :**
- Scale reads/writes indépendamment
- Optimized data models pour chaque use case
- Event sourcing possible
**OMNIA Application :** Analytics reads (ClickHouse) vs Transaction writes (PostgreSQL)

#### Event Sourcing
**Concept :** Store events, not state. Reconstituer state à partir d'events.
**Benefits :**
- Audit trail complet
- Time travel debugging
- Replay capabilities
**Trade-offs :** Complexité, event schema versioning

#### Strangler Fig Pattern
**Concept :** Migrer legacy progressivement
**Process :**
1. Route requests via facade
2. Migrer feature par feature
3. Éteindre legacy quand tout migré
**OMNIA Use case :** Migration progressive d'un monolithe

---

## 2. DATA ARCHITECTURE & PIPELINES

### Data Lakehouse Architecture

**Layers :**
```
Raw Zone (S3) → Cleaned Zone → Curated Zone → Serving Layer
     ↓              ↓              ↓              ↓
  Landing      Standardized   Aggregated    Analytics
  (JSON/CSV)   (Parquet)      (Tables)      (API/BI)
```

**Technologies :**
- **Ingestion :** Apache Kafka, AWS Kinesis, Fivetran
- **Storage :** S3 (Data Lake), Delta Lake (ACID on S3)
- **Processing :** Apache Spark, AWS Glue, dbt
- **Serving :** ClickHouse, BigQuery, Snowflake

### Stream Processing

**Apache Kafka Deep Dive :**
- **Topics :** Catégories de messages
- **Partitions :** Parallelism unit
- **Consumer Groups :** Load balancing
- **Offset Management :** Exactly-once semantics
- **Schema Registry :** Avro/Protobuf/JSON Schema versioning

**Kafka Streams vs KSQL :**
- **Streams :** Java library, stateful processing
- **KSQL :** SQL-like syntax, rapid prototyping

**OMNIA Use Case :**
- Real-time event tracking (clicks, conversions)
- Attribution modeling stream processing
- Alert detection (anomalies, thresholds)

### Batch Processing

**Apache Spark :**
- **RDDs :** Low-level API
- **DataFrames :** Structured data, Catalyst optimizer
- **Datasets :** Type-safe (Scala/Java)
- **Spark SQL :** SQL queries on distributed data

**Spark Optimization :**
- Partition tuning (avoid shuffle)
- Broadcast joins (small table optimization)
- Predicate pushdown (filter early)
- Cache/persist (réutilisation)

### Data Modeling

**Star Schema (Analytics) :**
- **Facts :** Métriques quantitatives (sales, clicks)
- **Dimensions :** Contexte (time, product, customer)
- **Benefits :** Query performance, user-friendly

**OMNIA Attribution Model :**
```sql
-- Fact table
touchpoint_events
- event_id (PK)
- user_id
- timestamp
- channel
- campaign_id
- ad_id
- cost
- conversion_value
- attribution_model

-- Dimensions
dim_users, dim_campaigns, dim_ads, dim_time
```

---

## 3. MACHINE LEARNING SYSTEMS

### MLOps Pipeline

```
Data Collection → Feature Engineering → Training → Evaluation → Deployment → Monitoring
       ↓                ↓                  ↓           ↓            ↓            ↓
   Versioning      Feature Store      Experiments   A/B Test    Serving     Drift Detection
```

### Feature Store Architecture

**Online Store :** Low-latency features for inference (Redis)
**Offline Store :** Historical features for training (S3/Parquet)
**Feature Engineering :** Transformations (normalization, encoding)

**OMNIA Features :**
```python
# User Features
user_features = {
    "ltv_predicted": 245.50,
    "churn_risk_score": 0.23,
    "preferred_channel": "email",
    "last_purchase_days": 12,
    "engagement_score": 0.78,
    "price_sensitivity": "medium"
}

# Creative Features
creative_features = {
    "hook_type": "problem_agitation",
    "visual_category": "ugc",
    "ctr_prediction": 0.045,
    "fatigue_score": 0.67,
    "optimal_audience": ["females_25_34", "females_35_44"]
}
```

### Model Deployment Patterns

#### Real-time Inference (REST API)
**Use case :** Creative scoring, churn prediction
**Latency :** <100ms
**Tools :** TensorFlow Serving, TorchServe, MLflow

#### Batch Inference
**Use case :** LTV prediction, audience scoring
**Frequency :** Hourly/daily
**Tools :** Spark ML, AWS Batch

#### Edge Deployment
**Use case :** Real-time bid optimization
**Tools :** TensorFlow Lite, ONNX Runtime

### Model Monitoring

**Metrics :**
- **Data Drift :** Feature distribution changes
- **Concept Drift :** Relationship input/output changes
- **Performance Drift :** Accuracy degradation
- **Latency/Throughput :** Infrastructure health

**OMNIA ML Monitoring :**
- Attribution model accuracy
- Creative performance predictions
- LTV model calibration
- Churn prediction precision/recall

---

## 4. REAL-TIME SYSTEMS

### WebSocket Architecture

**Use case OMNIA :** Dashboard temps réel
```
Client ←→ Load Balancer ←→ WebSocket Server ←→ Redis Pub/Sub ←→ Backend Services
```

**Scaling :**
- Horizontal (multiple WebSocket servers)
- Sticky sessions ou JWT-based routing
- Redis Pub/Sub pour broadcast cross-servers

### Event-Driven Architecture

**Event Bus :**
- **Events :** Immutable facts (OrderCreated, AdClicked)
- **Commands :** Intentions (CreateOrder, PauseCampaign)
- **Queries :** Read requests (GetCampaignStats)

**CQRS + Event Sourcing Example :**
```
Command → Validate → Emit Event → Project to Read Model
   ↓           ↓            ↓              ↓
CreateOrder  Business    OrderCreated    OrderView
             Rules       (Event Store)   (Query DB)
```

---

## 5. SECURITY & COMPLIANCE

### Authentication & Authorization

**OAuth 2.0 + OpenID Connect :**
- Authorization Code Flow (web apps)
- Client Credentials (service-to-service)
- PKCE (mobile/SPA)

**JWT Best Practices :**
- Short-lived access tokens (15 min)
- Refresh tokens rotation
- Secure storage (httpOnly cookies)
- Signature verification

**RBAC (Role-Based Access Control) :**
```yaml
roles:
  admin: [read:*, write:*, delete:*]
  manager: [read:*, write:campaigns, write:creatives]
  analyst: [read:analytics, read:reports]
  viewer: [read:dashboard]
```

### Data Security

**Encryption :**
- **At Rest :** AES-256 (RDS, S3)
- **In Transit :** TLS 1.3
- **Field-Level :** PII encryption (email, phone)

**API Security :**
- Rate limiting (token bucket)
- Input validation (JSON Schema)
- SQL injection prevention (ORM/parametrized queries)
- CORS policies

**Compliance :**
- **RGPD :** Consent tracking, right to erasure, data portability
- **CCPA :** California privacy rights
- **PCI DSS :** Payment data handling
- **SOC 2 :** Security controls audit

---

## 6. SCALING STRATEGIES

### Database Scaling

**Vertical :** Bigger instance (limité)
**Horizontal :**
- **Read Replicas :** Scaling reads
- **Sharding :** Partitionnement horizontal (user_id % n)
- **Partitioning :** Partitionnement vertical/temporel

**Caching Strategy :**
```
Client → CDN → Load Balancer → App Server → Cache → Database
```
- **CDN :** Static assets, edge caching
- **Redis :** Session store, query cache, rate limiting
- **Application Cache :** In-memory (Guava, caffeine)

### Cache Patterns

**Cache-Aside :**
```python
def get_user(user_id):
    user = cache.get(user_id)
    if not user:
        user = db.query(user_id)
        cache.set(user_id, user, ttl=3600)
    return user
```

**Write-Through :**
- Écriture simultanée DB + Cache
- Consistency forte
- Latence d'écriture augmentée

**Write-Behind :**
- Écriture cache seulement, async DB
- Performance maximale
- Risk de data loss

---

## 7. MONITORING & OBSERVABILITY

### Three Pillars

**1. Metrics (Time Series) :**
- Infrastructure : CPU, memory, disk, network
- Application : Request rate, latency, error rate (RED metrics)
- Business : Revenue, conversions, active users
- **Tools :** Prometheus, Grafana, Datadog

**2. Logs :**
- Structured logging (JSON)
- Correlation IDs (distributed tracing)
- Log levels (DEBUG, INFO, WARN, ERROR)
- **Tools :** ELK Stack, Splunk, CloudWatch

**3. Traces :**
- Distributed request flow
- Latency breakdown by service
- Bottleneck identification
- **Tools :** Jaeger, Zipkin, AWS X-Ray

### Alerting Strategy

**Alert Fatigue Prevention :**
- Pageable alerts : Vrais problèmes (SLO breaches)
- Warning alerts : Investigation needed
- Informational : Dashboards

**SLO/SLI/SLA :**
- **SLI :** Service Level Indicator (metric)
- **SLO :** Target (99.9% uptime)
- **SLA :** Contract with penalties

**OMNIA SLOs :**
- Dashboard load : <2s (99th percentile)
- Campaign API : 99.9% success rate
- Attribution latency : <5 min
- ML predictions : <100ms p95

---

## 8. API DESIGN

### RESTful Best Practices

**Resources :**
```
GET    /api/v1/campaigns          # List
POST   /api/v1/campaigns          # Create
GET    /api/v1/campaigns/{id}     # Read
PUT    /api/v1/campaigns/{id}     # Update
DELETE /api/v1/campaigns/{id}     # Delete
```

**Versioning :**
- URL versioning (/v1/, /v2/)
- Header versioning (Accept: application/vnd.api.v1+json)

**Pagination :**
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "per_page": 50,
    "total": 1250,
    "total_pages": 25,
    "next_url": "/api/v1/campaigns?page=2"
  }
}
```

**Filtering/Sorting :**
```
GET /api/v1/campaigns?status=active&roas_gt=2.0&sort=-created_at
```

### GraphQL (Alternative)

**Benefits :**
- Client-specified queries
- Single endpoint
- Strong typing (schema)
- Introspection

**Trade-offs :**
- Complexité
- Caching challenges
- Query depth attacks (limit needed)

### gRPC (Internal Services)

**Benefits :**
- HTTP/2 multiplexing
- Protocol Buffers (efficient serialization)
- Streaming (client/server/bidirectional)
- Code generation

**OMNIA Use case :** Service-to-service communication

---

## 9. DEVOPS & CI/CD

### Infrastructure as Code

**Terraform :**
- Declarative infrastructure
- State management
- Modularity (modules)
- Multi-cloud support

**Ansible :**
- Configuration management
- Idempotent operations
- Agentless (SSH)

### CI/CD Pipeline

```
Code Commit → Build → Test → Security Scan → Deploy to Staging → E2E Tests → Deploy to Prod
     ↓          ↓       ↓         ↓               ↓              ↓            ↓
   GitHub    Docker   Unit    Snyk/           Integration    Selenium    Blue/Green
   Actions    Build   Tests    Sonar          Tests          /Cypress    or Canary
```

### Deployment Strategies

**Blue/Green :**
- Two identical environments
- Instant switch (zero downtime)
- Easy rollback
- Double resources required

**Canary :**
- Deploy to subset of users
- Monitor metrics
- Gradual rollout
- Automatic rollback on errors

**Feature Flags :**
- Deploy code disabled
- Enable for specific users/segments
- A/B testing capability
- Kill switch for features

---

## 10. PERFORMANCE OPTIMIZATION

### Frontend Performance

**Core Web Vitals :**
- **LCP (Largest Contentful Paint) :** <2.5s
- **FID (First Input Delay) :** <100ms
- **CLS (Cumulative Layout Shift) :** <0.1

**Optimizations :**
- Code splitting (lazy loading)
- Image optimization (WebP, responsive)
- CDN usage
- Caching strategies
- Bundle size optimization

### Database Performance

**Query Optimization :**
- EXPLAIN ANALYZE pour comprendre plans d'exécution
- Index appropriés (B-tree, GIN, GiST)
- Eviter N+1 queries
- Partitionnement pour grandes tables

**OMNIA Query Patterns :**
```sql
-- Attribution query optimisée
WITH touchpoints AS (
  SELECT user_id, channel, timestamp, cost,
         ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY timestamp) as touch_num
  FROM events
  WHERE timestamp BETWEEN $start AND $end
),
conversions AS (
  SELECT user_id, conversion_value, timestamp as conv_time
  FROM orders
  WHERE timestamp BETWEEN $start AND $end
)
SELECT 
  t.channel,
  COUNT(DISTINCT c.user_id) as attributed_conversions,
  SUM(c.conversion_value) as attributed_revenue,
  SUM(t.cost) as total_cost
FROM touchpoints t
JOIN conversions c ON t.user_id = c.user_id
WHERE t.timestamp < c.conv_time
GROUP BY t.channel;
```

---

## 11. TESTING STRATEGIES

### Testing Pyramid

```
    /\
   /  \  E2E Tests (few)
  /____\
 /      \  Integration Tests
/________\
          \  Unit Tests (many)
```

**Unit Tests :**
- Fast, isolated
- Mock dependencies
- >80% code coverage

**Integration Tests :**
- Database interactions
- API contracts
- Service interactions

**E2E Tests :**
- User workflows
- Selenium/Cypress/Playwright
- Slower, fragile

### Load Testing

**Tools :** JMeter, K6, Artillery
**Metrics :**
- Throughput (requests/sec)
- Latency percentiles (p50, p95, p99)
- Error rates
- Resource utilization

**OMNIA Load Scenarios :**
- Black Friday traffic (10x normal)
- Campaign creation spikes
- Report generation concurrente

---

## 12. COST OPTIMIZATION

### Cloud Cost Management

**Compute :**
- Reserved Instances (1-3 year commitment)
- Spot Instances (stateless workloads)
- Auto-scaling (scale to zero)

**Storage :**
- S3 lifecycle policies (glacier for old data)
- Compression (Parquet, Snappy)
- Data retention policies

**Database :**
- Right-sizing instances
- Read replicas vs connection pooling
- Aurora Serverless (variable workloads)

**Monitoring :**
- AWS Cost Explorer
- Budget alerts
- Tagging strategy (cost allocation)

---

*Ce document évolue avec les nouvelles technologies et patterns.*
*Version : 1.0 | Dernière mise à jour : Février 2025*
