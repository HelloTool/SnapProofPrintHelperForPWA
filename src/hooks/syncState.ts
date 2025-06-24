import { type Accessor, createRenderEffect, createSignal, on, type Setter } from 'solid-js';

export interface SyncStateOptions<U, D> {
  flowDown: (upstreamValue: U) => D;
  flowUp: (downstreamValue: D) => U;
  canFlowUp?: (downstreamValue: D) => boolean;
  canFlowDown?: (upstreamValue: U) => boolean;
}

export function syncState<U, D>(
  upstreamValue: Accessor<U>,
  setUpstreamValue: (value: Accessor<U>) => void,
  { flowDown, flowUp, canFlowUp = () => true, canFlowDown = () => true }: SyncStateOptions<U, D>,
): [Accessor<D>, Setter<D>] {
  let flowedUpstreamValue: U = upstreamValue();
  let flowedDownstreamValue: D = flowDown(flowedUpstreamValue);
  const [downstreamValue, setDownstreamValue] = createSignal<D>(flowedDownstreamValue);
  createRenderEffect(
    on(
      upstreamValue,
      (v) => {
        if (v !== flowedUpstreamValue && canFlowDown(v)) {
          const newValue = flowDown(v);
          if (newValue !== flowedDownstreamValue) {
            flowedUpstreamValue = flowUp(newValue);
            flowedDownstreamValue = newValue;
            setDownstreamValue(() => newValue);
          }
        }
      },
      { defer: true },
    ),
  );
  createRenderEffect(
    on(
      downstreamValue,
      (v) => {
        if (v !== flowedDownstreamValue && canFlowUp(v)) {
          const newValue = flowUp(v);
          if (newValue !== flowedUpstreamValue) {
            flowedDownstreamValue = flowDown(newValue);
            flowedUpstreamValue = newValue;
            setUpstreamValue(() => newValue);
          }
        }
      },
      { defer: true },
    ),
  );
  return [downstreamValue, setDownstreamValue];
}
