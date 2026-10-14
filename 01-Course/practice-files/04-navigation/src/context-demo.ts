interface Job {
  id: string
  status: "queued" | "running" | "done"
  attempts: number
}

export function processJobs(jobs: Job[]): Job[] {
  const active = jobs.filter((job) => job.status !== "done")

  return active.map((job) => {
    if (job.status === "queued") {
      return startJob(job)
    }

    if (job.attempts > 3) {
      return finishJob(job)
    }

    return retryJob(job)
  })
}

function startJob(job: Job): Job {
  return { ...job, status: "running", attempts: job.attempts + 1 }
}

function retryJob(job: Job): Job {
  const nextAttempt = job.attempts + 1
  return nextAttempt > 3 ? finishJob(job) : { ...job, attempts: nextAttempt }
}

function finishJob(job: Job): Job {
  return { ...job, status: "done" }
}

export function summarizeJobs(jobs: Job[]): Record<Job["status"], number> {
  return jobs.reduce(
    (summary, job) => {
      summary[job.status] += 1
      return summary
    },
    { queued: 0, running: 0, done: 0 },
  )
}
