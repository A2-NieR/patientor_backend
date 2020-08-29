"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../data/patients"));
const uuid_1 = require("uuid");
const getEntries = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries,
    }));
};
const findById = (id) => {
    const entry = patients_1.default.find((p) => p.id === id);
    if (!entry) {
        return undefined;
    }
    else if (!('entries' in entry)) {
        const withEntries = Object.assign(Object.assign({}, entry), { entries: [] });
        return withEntries;
    }
    return entry;
};
const addPatient = (entry) => {
    if ('entries' in entry) {
        const newPatient = Object.assign(Object.assign({}, entry), { id: uuid_1.v4() });
        patients_1.default.push(newPatient);
        return newPatient;
    }
    else {
        const newPatient = Object.assign(Object.assign({}, entry), { id: uuid_1.v4(), entries: [] });
        patients_1.default.push(newPatient);
        return newPatient;
    }
};
const addEntry = (id, entry) => {
    const patient = patients_1.default.find((p) => p.id === id);
    if (patient && entry) {
        const patientEntries = patient.entries;
        const newEntry = Object.assign(Object.assign({}, entry), { id: uuid_1.v4() });
        patientEntries.push(newEntry);
        return newEntry;
    }
    return undefined;
};
exports.default = {
    getEntries,
    addPatient,
    findById,
    addEntry,
};
