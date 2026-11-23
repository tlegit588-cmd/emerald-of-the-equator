CREATE TABLE IF NOT EXISTS business_applications (
 id TEXT PRIMARY KEY,
 business_name TEXT NOT NULL,
 category TEXT NOT NULL CHECK(category IN ('stay','food','guide','transport','other')),
 island TEXT NOT NULL CHECK(island IN ('sao_tome','principe')),
 area TEXT NOT NULL,
 description TEXT NOT NULL,
 contact_name TEXT NOT NULL,
 email TEXT NOT NULL,
 phone TEXT,
 website TEXT,
 status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','approved','rejected')),
 consent_at TEXT NOT NULL,
 submitted_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
 reviewed_at TEXT,
 review_notes TEXT
);
CREATE INDEX IF NOT EXISTS idx_business_applications_status ON business_applications(status,submitted_at);
