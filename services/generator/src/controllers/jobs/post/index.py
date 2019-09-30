from storage import createJob

def addJob(customerId, productId, quantity):
  createJob(customerId, productId, quantity)

  return { "ok": True }