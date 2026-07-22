DELETE FROM "session"
WHERE "user_id" IN (
    SELECT "id"
    FROM "user"
    WHERE "email_verified" = false
);
