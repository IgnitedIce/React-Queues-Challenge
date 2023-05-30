# React Queues Challenge

This fun challenge was taken from [This YouTube tutorial](https://www.youtube.com/watch?v=B9fmr1TpKHE) and solved alone.

A compiled version is available [here](https://ignitedice.github.io).

## Challenge Description

The goal is to have 5 queues of customers, where every customer has some items.

Every 100 milliseconds a product is being scanned and removed from the first person on every queue.

When all of their products were scanned, they're removed from the queue and the second person now becomes the first.

This process repeats for every queue until its empty.

### New Customer

You can add a new customer by typing an amount and clicking **_Checkout_**.

The new customer will be added to the shortest queue, defined as the queue with the minimum total items.

#### Example

Assuming there are 2 queues:

- Queue #1 has 2 customers:

  - The first one has 5 items.
  - The second one has 7 items.

- Queue #2 has 1 customer with 18 items.

Let's calculate the total items first:

- The total items in Queue #1 is 12 items.

- The total items in Queue #2 is 18 items.

Then, the best queue will be Queue #1, and the next customer will be assigned to Queue #1.

## Notes

This website was made using the following:

- React
- TypeScript
- Bootstrap 5
- Vite
