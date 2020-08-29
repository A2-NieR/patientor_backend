"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewEntry = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const types_1 = require("./types");
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const isGender = (param) => {
    return Object.values(types_1.Gender).includes(param);
};
const isNumber = (num) => {
    return typeof num === 'number' || num instanceof Number;
};
const isEntryType = (param) => {
    return Object.values(types_1.EntryType).includes(param);
};
const isStringArray = (param) => {
    return typeof param[0] === 'string';
};
const parseName = (name) => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name: ' + name);
    }
    return name;
};
const parseSSN = (ssn) => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn: ' + ssn);
    }
    return ssn;
};
const parseJob = (occupation) => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation: ' + occupation);
    }
    return occupation;
};
const parseDate = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};
const parseGender = (gender) => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};
const toNewPatientEntry = (object) => {
    const newEntry = {
        name: parseName(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseSSN(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseJob(object.occupation),
    };
    return newEntry;
};
const parseDescription = (description) => {
    if (!description || !isString(description)) {
        throw new Error('Incorrect or missing description: ' + description);
    }
    return description;
};
const parseSpecialist = (specialist) => {
    if (!specialist || !isString(specialist)) {
        throw new Error('Incorrect or missing specialist: ' + specialist);
    }
    return specialist;
};
const parseEmployer = (employer) => {
    if (!employer || !isString(employer)) {
        throw new Error('Incorrect or missing employer: ' + employer);
    }
    return employer;
};
const parseHCRating = (rating) => {
    if ((rating !== 0 && !rating) || !isNumber(rating)) {
        throw new Error('Incorrect or missing health rating: ' + rating);
    }
    return rating;
};
const parseEntryType = (type) => {
    if (!type || !isEntryType(type)) {
        throw new Error('Incorrect or missing type: ' + type);
    }
    return type;
};
const parseDischarge = (discharge) => {
    if (!discharge ||
        !discharge.date ||
        !discharge.criteria ||
        !isDate(discharge.date) ||
        !isString(discharge.criteria)) {
        throw new Error('Incorrect or missing discharge data: ' + discharge);
    }
    return discharge;
};
const parseDiagnosisCodes = (code) => {
    if (!isStringArray(code)) {
        throw new Error('Incorrect diagnosis code(s): ' + code);
    }
    return code;
};
const parseSickLeave = (dates) => {
    if (!isDate(dates.startDate) || !isDate(dates.endDate)) {
        throw new Error('Incorrect sick leave date(s): ' + dates);
    }
    return dates;
};
exports.toNewEntry = (object) => {
    if (object.type === 'HealthCheck') {
        const newHCEntry = {
            description: parseDescription(object.description),
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist),
            diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
            type: parseEntryType(object.type),
            healthCheckRating: parseHCRating(object.healthCheckRating),
        };
        return newHCEntry;
    }
    else if (object.type === 'OccupationalHealthcare') {
        const newOHCEntry = {
            description: parseDescription(object.description),
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist),
            diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
            type: parseEntryType(object.type),
            employerName: parseEmployer(object.employerName),
            sickLeave: parseSickLeave(object.sickLeave),
        };
        return newOHCEntry;
    }
    else {
        const newHEntry = {
            description: parseDescription(object.description),
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist),
            diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
            type: parseEntryType(object.type),
            discharge: parseDischarge(object.discharge),
        };
        return newHEntry;
    }
};
exports.default = toNewPatientEntry;
