const vehicleImagesSchema = `
    CREATE TABLE IF NOT EXISTS vehicle_images (
        id BIGINT(20) UNSIGNED AUTO_INCREMENT NOT NULL,
        vehicle_id int(20) NULL,
        files VARCHAR(255) NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        INDEX (vehicle_id)
    )
`;

export default vehicleImagesSchema;
