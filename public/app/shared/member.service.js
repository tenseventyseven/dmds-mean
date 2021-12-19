"use strict";

angular
  .module("app")

  .factory("memberService", memberService);

function memberService($http) {
  var service = {
    getMember: getMember,
    getMembers: getMembers,
    getActiveMembers: getActiveMembers,
    getNext: getNext,
    createMember: createMember,
    updateMember: updateMember,
    deleteMember: deleteMember,
    getMemberPhoto: getMemberPhoto,
  };

  return service;

  // get a single member
  function getMember(id) {
    return $http.get("/api/member/" + id);
  }

  // get all members
  function getMembers() {
    return $http.get("/api/member/");
  }

  // get all active members
  function getActiveMembers() {
    return $http.get("/api/member/active");
  }

  // get next member ID
  function getNext() {
    return $http.get("/api/member/next");
  }

  // create a members
  function createMember(memberData) {
    return $http.post("/api/member/", memberData);
  }

  // update a member
  function updateMember(id, memberData) {
    return $http.put("/api/member/" + id, memberData);
  }

  // delete a member
  function deleteMember(id) {
    return $http.delete("/api/member/" + id);
  }

  // get member photo
  function getMemberPhoto(memberId) {
    return $http.get("/api/memberphoto/" + memberId, {
      responseType: "arraybuffer",
    });
  }
}
