-- PostgreSQL Database Schema for Globe IoT
-- Run this script to create the necessary tables

-- Create database (if not exists)
-- CREATE DATABASE globe_iot;

-- Connect to globe_iot database before running the rest of this script

-- Create arcs table
CREATE TABLE IF NOT EXISTS arcs (
    id SERIAL PRIMARY KEY,
    startLat DECIMAL(10, 4) NOT NULL,
    startLng DECIMAL(10, 4) NOT NULL,
    endLat DECIMAL(10, 4) NOT NULL,
    endLng DECIMAL(10, 4) NOT NULL,
    name VARCHAR(3) NOT NULL,
    color VARCHAR(20) NOT NULL DEFAULT '#50B6E8',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create pontos_adicionais table
CREATE TABLE IF NOT EXISTS pontos_adicionais (
    id SERIAL PRIMARY KEY,
    lat DECIMAL(10, 4) NOT NULL,
    lng DECIMAL(10, 4) NOT NULL,
    size DECIMAL(3, 1) NOT NULL DEFAULT 0.3,
    color VARCHAR(20) NOT NULL DEFAULT '#0058E8',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_arcs_name ON arcs(name);
CREATE INDEX IF NOT EXISTS idx_pontos_lat_lng ON pontos_adicionais(lat, lng);

-- Insert sample data (from your JSON file)

-- AFRICA
INSERT INTO arcs (startLat, startLng, endLat, endLng, name, color) VALUES
(38.7223, -9.1393, -8.8383, 13.2344, 'LAD', '#50B6E8'),
(38.7223, -9.1393, 0.4162, 9.4673, 'LBV', '#50B6E8'),
(38.7223, -9.1393, 32.8872, 13.5888, 'TIP', '#50B6E8'),
(38.7223, -9.1393, 33.5731, -7.5898, 'CMN', '#50B6E8'),
(38.7223, -9.1393, -25.9653, 32.5832, 'MPM', '#50B6E8'),
(38.7223, -9.1393, 0.3366, 6.7325, 'TMS', '#50B6E8'),
(38.7223, -9.1393, 30.0444, 31.2357, 'CAI', '#50B6E8'),
(38.7223, -9.1393, 5.3600, -4.0083, 'ABJ', '#50B6E8'),
(38.7223, -9.1393, 14.9213, -23.5085, 'RAI', 'rgba(255,255,255,0.2)');

-- AMERICA
INSERT INTO arcs (startLat, startLng, endLat, endLng, name, color) VALUES
(38.7223, -9.1393, -34.5997, -58.3819, 'BUE', '#50B6E8'),
(38.7223, -9.1393, -15.7939, -47.8828, 'BSB', '#50B6E8'),
(38.7223, -9.1393, 45.4215, -75.6972, 'YOW', '#50B6E8'),
(38.7223, -9.1393, -33.4489, -70.6693, 'SCL', '#50B6E8'),
(38.7223, -9.1393, 4.7110, -74.0721, 'BOG', '#50B6E8'),
(38.7223, -9.1393, 18.4861, -69.9312, 'SDQ', '#50B6E8'),
(38.7223, -9.1393, 13.6929, -89.2182, 'SAL', '#50B6E8'),
(38.7223, -9.1393, 14.6349, -90.5069, 'GUA', '#50B6E8'),
(38.7223, -9.1393, 14.0723, -87.2068, 'TGU', '#50B6E8'),
(38.7223, -9.1393, 19.4326, -99.1332, 'MEX', '#50B6E8'),
(38.7223, -9.1393, 8.9824, -79.5199, 'PTY', '#50B6E8'),
(38.7223, -9.1393, -12.0464, -77.0428, 'LIM', '#50B6E8'),
(38.7223, -9.1393, 40.6611, -73.9450, 'JFK', '#50B6E8'),
(38.7223, -9.1393, 34.0522, -118.2437, 'LAX', '#50B6E8');

-- EUROPE
INSERT INTO arcs (startLat, startLng, endLat, endLng, name, color) VALUES
(38.7223, -9.1393, 48.2084, 16.3738, 'VIE', '#50B6E8'),
(38.7223, -9.1393, 50.8471, 4.3661, 'BRU', '#50B6E8'),
(38.7223, -9.1393, 45.8150, 15.9819, 'ZAG', '#50B6E8'),
(38.7223, -9.1393, 35.1856, 33.3823, 'NIC', '#50B6E8'),
(38.7223, -9.1393, 50.0755, 14.4378, 'PRG', '#50B6E8'),
(38.7223, -9.1393, 55.6761, 12.5683, 'CPH', '#50B6E8'),
(38.7223, -9.1393, 40.4169, -3.7034, 'MAD', '#50B6E8'),
(38.7223, -9.1393, 59.4370, 24.7536, 'TLL', '#50B6E8'),
(38.7223, -9.1393, 60.1695, 24.9355, 'HEL', '#50B6E8'),
(38.7223, -9.1393, 48.8567, 2.3522, 'CDG', '#50B6E8'),
(38.7223, -9.1393, 52.5167, 13.3833, 'BER', '#50B6E8'),
(38.7223, -9.1393, 37.9838, 23.7275, 'ATH', '#50B6E8'),
(38.7223, -9.1393, 47.4979, 19.0402, 'BUD', '#50B6E8'),
(38.7223, -9.1393, 41.8933, 12.4828, 'FCO', '#50B6E8'),
(38.7223, -9.1393, 54.6872, 25.2797, 'VNO', '#50B6E8'),
(38.7223, -9.1393, 49.8153, 6.1296, 'LUX', '#50B6E8'),
(38.7223, -9.1393, 52.3702, 4.8952, 'AMS', '#50B6E8'),
(38.7223, -9.1393, 54.5973, -5.9301, 'BFS', '#50B6E8'),
(38.7223, -9.1393, 59.9139, 10.7522, 'OSL', '#50B6E8'),
(38.7223, -9.1393, 52.2322, 21.0122, 'WAW', '#50B6E8'),
(38.7223, -9.1393, 41.1496, -8.6109, 'OPO', '#50B6E8'),
(38.7223, -9.1393, 53.9045, 27.5615, 'MSQ', '#50B6E8'),
(38.7223, -9.1393, 44.4268, 26.1025, 'OTP', '#50B6E8'),
(38.7223, -9.1393, 55.7558, 37.6173, 'SVO', '#50B6E8'),
(38.7223, -9.1393, 48.1486, 17.1077, 'BTS', '#50B6E8'),
(38.7223, -9.1393, 46.0569, 14.5058, 'LJU', '#50B6E8'),
(38.7223, -9.1393, 59.3293, 18.0686, 'ARN', '#50B6E8'),
(38.7223, -9.1393, 47.3769, 8.5417, 'ZRH', '#50B6E8'),
(38.7223, -9.1393, 51.5099, -0.1180, 'LHR', '#50B6E8');

-- ASIA
INSERT INTO arcs (startLat, startLng, endLat, endLng, name, color) VALUES
(38.7223, -9.1393, 24.6333, 46.7167, 'RUH', '#50B6E8'),
(38.7223, -9.1393, 39.9042, 116.4074, 'PEK', '#50B6E8'),
(38.7223, -9.1393, -6.2088, 106.8456, 'CGK', '#50B6E8'),
(38.7223, -9.1393, 35.6892, 51.3890, 'THR', '#50B6E8'),
(38.7223, -9.1393, 32.0853, 34.7818, 'TLV', '#50B6E8'),
(38.7223, -9.1393, 31.9454, 35.9284, 'AMM', '#50B6E8'),
(38.7223, -9.1393, 29.3786, 47.9904, 'KWI', '#50B6E8'),
(38.7223, -9.1393, 33.8938, 35.5018, 'BEY', '#50B6E8'),
(38.7223, -9.1393, 47.9213, 106.9186, 'ULN', '#50B6E8'),
(38.7223, -9.1393, 14.5995, 120.9842, 'MNL', '#50B6E8'),
(38.7223, -9.1393, 25.2854, 51.5310, 'DOH', '#50B6E8'),
(38.7223, -9.1393, 21.4858, 39.1925, 'JED', '#50B6E8'),
(38.7223, -9.1393, 25.0330, 121.5654, 'TPE', '#50B6E8'),
(38.7223, -9.1393, 25.2048, 55.2708, 'DXB', '#50B6E8'),
(38.7223, -9.1393, 41.2995, 69.2401, 'TAS', '#50B6E8');

-- OCEANIA
INSERT INTO arcs (startLat, startLng, endLat, endLng, name, color) VALUES
(38.7223, -9.1393, -33.8678, 151.2073, 'SYD', '#50B6E8');

-- Sample additional points
INSERT INTO pontos_adicionais (lat, lng, size, color) VALUES
-- Portugal
(38.7169, -9.139, 0.3, '#0058E8'),
(41.1496, -8.611, 0.3, '#0058E8'),
-- Spain
(40.4168, -3.7038, 0.3, '#0058E8'),
(41.3851, 2.1734, 0.3, '#0058E8'),
(39.4699, -0.3763, 0.3, '#0058E8'),
(37.3891, -5.9845, 0.3, '#0058E8'),
(43.263, -2.935, 0.3, '#0058E8'),
-- France
(48.8566, 2.3522, 0.3, '#0058E8'),
(45.764, 4.8357, 0.3, '#0058E8'),
(43.2965, 5.3698, 0.3, '#0058E8');
