"use strict";

angular
  .module("app")

  .factory("attendanceService", attendanceService);

function attendanceService($http) {
  var service = {
    getAttendance: getAttendance,
    getAttendancesByMember: getAttendancesByMember,
    getLatestAttendanceByMember: getLatestAttendanceByMember,
    getAttendancesByMemberAndTime: getAttendancesByMemberAndTime,
    getAttendancesForYYYYMMDD: getAttendancesForYYYYMMDD,
    createAttendance: createAttendance,
    updateAttendance: updateAttendance,
    deleteAttendance: deleteAttendance,
  };

  return service;

  // get a single attendance
  function getAttendance(id) {
    return $http.get("/api/attendance/" + id);
  }

  // get all attendance s by member
  function getAttendancesByMember(memberId) {
    return $http.get("/api/attendance/member/" + memberId);
  }

  // get latest attendance by member
  function getLatestAttendanceByMember(memberId) {
    return $http.get("/api/attendance/member/" + memberId + "/latest");
  }

  // get count of attendanecs by member from time
  function getAttendancesByMemberAndTime(memberId, time) {
    return $http.get("/api/attendance/member/" + memberId + "/" + time);
  }

  function getAttendancesForYYYYMMDD(yyyymmdd) {
    return $http.get("/api/attendance/all/" + yyyymmdd);
  }

  // create an attendance
  function createAttendance(attendanceData) {
    return $http.post("/api/attendance/", attendanceData);
  }

  // update an attendance
  function updateAttendance(id, attendanceData) {
    return $http.put("/api/attendance/" + id, attendanceData);
  }

  // delete an attendance
  function deleteAttendance(id) {
    return $http.delete("/api/attendance/" + id);
  }
}
