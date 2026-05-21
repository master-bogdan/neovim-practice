// OBJECTIVE: Rename API version strings using different substitute techniques
//
// Tasks:
//   1. Replace all `/api/v1/` with `/api/v2/` using :%s with a # delimiter
//   2. Selectively replace `fetchData` → `requestData` using cgn workflow
//      (skip the one in the test mock on line 55)
//   3. Delete all console.log lines using :g/console.log/d
//   4. Copy all TODO comments to end of file using :g/TODO/t$
//   5. Replace `userId` with `accountId` only on lines 30-40 using :30,40s/
//
// TIMING: Expert 60s | Proficient 120s | Learning 240s

import { Logger } from "./logger"

// TODO: add rate limiting
const BASE_URL = "/api/v1/users"
const ADMIN_URL = "/api/v1/admin"
const BILLING_URL = "/api/v1/billing"
const HEALTH_URL = "/api/v1/health"

interface ApiClient {
  baseUrl: string
  timeout: number
}

// TODO: implement retry logic
function createClient(env: string): ApiClient {
  const url = env === "prod" ? "/api/v1/production" : "/api/v1/staging"
  return { baseUrl: url, timeout: 5000 }
}

function getUserProfile(userId: string) {
  console.log("fetching profile for", userId)
  return fetchData(`/api/v1/users/${userId}/profile`)
}

function updateUser(userId: string, data: unknown) {
  console.log("updating user", userId)
  return fetchData(`/api/v1/users/${userId}`, { method: "PUT", body: data })
}

function deleteUser(userId: string) {
  console.log("deleting user", userId)
  return fetchData(`/api/v1/users/${userId}`, { method: "DELETE" })
}

// TODO: add pagination support
function listUsers(page: number) {
  console.log("listing users page", page)
  return fetchData(`/api/v1/users?page=${page}`)
}

function fetchData(url: string, options?: RequestInit) {
  return fetch(url, { ...options, headers: { "X-Api-Version": "v1" } })
}

// Tests
function mockFetchData() {
  // keep this one as fetchData - do NOT rename
  return jest.fn().mockImplementation(fetchData)
}

// TODO: add error handling tests
function testGetUser() {
  const result = fetchData("/api/v1/users/123/profile")
  expect(result).toBeDefined()
}

function testListUsers() {
  const result = fetchData("/api/v1/users?page=1")
  expect(result).toHaveLength(10)
}

// EXPECTED after all tasks:
// 1. All /api/v1/ → /api/v2/
// 2. fetchData → requestData everywhere EXCEPT line 55 (mockFetchData body)
// 3. All console.log lines removed
// 4. TODO comments copied to end of file
// 5. userId → accountId only in lines 30-40
