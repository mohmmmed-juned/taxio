const bookingsSchema = `
    CREATE TABLE IF NOT EXISTS bookings (
        id BIGINT(20) UNSIGNED AUTO_INCREMENT NOT NULL,
        user_id VARCHAR(255) NULL,
        vehicle_id int(20) NULL,
        driver_id VARCHAR(255) NULL,
        amount DOUBLE(10,2) DEFAULT 0.00,
        pick_up_address VARCHAR(255) NULL,
        destination_address VARCHAR(255) NULL,
        distance DOUBLE(10,2) DEFAULT 0.00,
        time VARCHAR(255) NULL,
        status INT(11) DEFAULT 1 COMMENT '1:Active, 2:Completed, 3:Cancelled',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        INDEX (user_id),
        INDEX (vehicle_id),
        INDEX (driver_id)
    )
`;

export default bookingsSchema;
