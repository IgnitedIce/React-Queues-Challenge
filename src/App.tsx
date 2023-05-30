import { useEffect, useRef, useState } from "react";
import "./app.css";

interface INode {
	items: number;
	next?: INode;
}

interface IQueue {
	total: number;
	chosen: boolean;
	topNode?: INode;
}

function Queue({ front }: { front: INode }) {
	return (
		<>
			<div className="c-box d-flex justify-content-center align-items-center border rounded-circle fs-3">
				{front.items}
			</div>

			{front.next ? <Queue front={front.next} /> : null}
		</>
	);
}

function getQueueSum(front: INode): number {
	return front.items + (front.next ? getQueueSum(front.next) : 0);
}

function getBestQueue(queues: IQueue[]) {
	let min = Infinity;
	let bestQueue: IQueue | null = null;
	for (const queue of queues) {
		if (!queue.topNode) {
			bestQueue = queue;
			break;
		}

		const sum = getQueueSum(queue.topNode);
		if (sum <= min) {
			min = sum;
			bestQueue = queue;
		}
	}

	return bestQueue;
}

function append(to: INode, add: INode) {
	if (!to.next) {
		to.next = add;
		return;
	}

	append(to.next, add);
}

function App() {
	const [queues, setQueues] = useState<IQueue[]>([
		{ chosen: false, total: 0, topNode: { items: 134, next: { items: 433 } } },
		{ chosen: false, total: 0, topNode: { items: 86, next: { items: 75 } } },
		{ chosen: false, total: 0, topNode: { items: 122, next: { items: 28 } } },
		{
			chosen: false,
			total: 0,
			topNode: { items: 189, next: { items: 50, next: { items: 72 } } },
		},
		{ chosen: false, total: 0, topNode: { items: 12, next: { items: 36 } } },
	]);

	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		const interval = setInterval(() => {
			const _queues: IQueue[] = structuredClone(queues);

			for (const queue of _queues) {
				if (queue.topNode) {
					if (--queue.topNode.items === 0) {
						queue.topNode = queue.topNode.next;
					}

					queue.total++;
				}

				queue.chosen = getBestQueue(_queues) === queue;
			}

			setQueues(_queues);
		}, 100);

		return () => {
			clearInterval(interval);
		};
	}, [queues]);

	return (
		<div className="full-height p-5 d-flex flex-column gap-3">
			<div className="d-flex justify-content-center gap-3 mb-4">
				<input
					type="number"
					className="form-control rounded-pill w-auto"
					placeholder="Amount"
					ref={inputRef}
				/>

				<button
					className="btn btn-outline-success rounded-pill"
					onClick={() => {
						if (!inputRef.current) {
							alert("Input has not been initialized yet");
							return;
						}

						const _queues: IQueue[] = structuredClone(queues);

						const bestQueue = getBestQueue(_queues);

						if (!bestQueue) {
							setQueues(_queues);
							return;
						}

						const items = inputRef.current.valueAsNumber;

						const node: INode = {
							items: isNaN(items) ? 1 : items,
						};

						if (!bestQueue.topNode) {
							bestQueue.topNode = node;
							setQueues(_queues);
							return;
						}

						append(bestQueue.topNode, node);

						setQueues(_queues);
					}}
				>
					Checkout
				</button>
			</div>

			<div className="d-flex justify-content-center gap-3">
				{queues.map((queue, idx) => (
					<div
						key={idx}
						className={
							"c-box d-flex flex-column justify-content-center align-items-center text-center rounded-5 fs-2 bg-" +
							(queue.chosen ? "success" : "secondary")
						}
					>
						{queue.chosen ? (
							<span className="fs-6 text-center">Best</span>
						) : null}
						{queue.total}
					</div>
				))}
			</div>

			<div className="d-flex justify-content-center gap-3">
				{queues.map((queue, idx) => (
					<div key={idx} className="d-flex flex-column gap-3">
						{queue.topNode ? (
							<Queue front={queue.topNode} />
						) : (
							<div className="c-box"></div>
						)}
					</div>
				))}
			</div>

			<div className="full-height"></div>

			<h4 className="m-0">IgnitedIce</h4>

			<p>
				The challenge was taken from{" "}
				<a href="https://www.youtube.com/watch?v=B9fmr1TpKHE" target="_blank">
					this YouTube tutorial
				</a>{" "}
				and solved alone.
			</p>
		</div>
	);
}

export default App;
