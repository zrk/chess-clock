import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import sinon from 'sinon';

import Countdown from '@/components/Countdown.vue';

describe('Countdown.vue', () => {
  it('makes leading and trailing zeros in "mm:ss.000"', () => {
    const wrapper = shallowMount(Countdown, {
      propsData: { minutes: 1, seconds: 1.1 },
    });
    expect(wrapper.text()).to.be.equal('01:01.100');
  });

  it('stays with "mm:ss.000" format when fed with crazy props', () => {
    const wrapper = shallowMount(Countdown, {
      propsData: { minutes: 1234, seconds: 5678.12345 },
    });
    expect(wrapper.text()).to.be.equal('34:78.123');
  });

  it('counts time precisely', () => {
    const clock = sinon.useFakeTimers();
    const wrapper = shallowMount(Countdown, {
      propsData: { minutes: 2, seconds: 56, run: true },
    });
    clock.tick(150000); // 2 minutes 30 seconds
    expect(wrapper.text()).to.include('00:26.00'); // accurate up to the last digit but one
    clock.restore();
  });

  it('responds to ":run" prop init or change with "start" and "stop" events', () => {
    const clock = sinon.useFakeTimers();
    let wrapper;

    wrapper = shallowMount(Countdown, {
      propsData: { run: true },
    });
    expect(wrapper.emitted().start).to.exist;

    wrapper = shallowMount(Countdown, {
      propsData: { run: false },
    });
    expect(wrapper.emitted().stop).to.exist;

    expect(wrapper.emitted().start).to.not.exist;
    wrapper.setProps({ run: true });
    expect(wrapper.emitted().start).to.exist;

    expect(wrapper.emitted().stop.length).to.equal(1);
    wrapper.setProps({ run: false });
    expect(wrapper.emitted().stop.length).to.equal(2);

    clock.restore();
  });

  it('starts and stops on ":run" prop init or change', () => {
    const clock = sinon.useFakeTimers();
    let wrapper;

    // Helpers
    function expectRunning() {
      const textOnStart = wrapper.text();
      clock.tick(3000);
      expect(wrapper.text()).not.to.be.equal(textOnStart);
    }

    function expectStopped() {
      const textOnStop = wrapper.text();
      clock.tick(3000);
      expect(wrapper.text()).to.be.equal(textOnStop);
    }

    // The test
    wrapper = shallowMount(Countdown, {
      propsData: { seconds: 20, run: true },
    });
    expectRunning();

    wrapper = shallowMount(Countdown, {
      propsData: { seconds: 20, run: false },
    });
    expectStopped();

    wrapper.setProps({ run: true });
    expectRunning();

    wrapper.setProps({ run: false });
    expectStopped();

    clock.restore();
  });

  it('stops when run out of time, emitting "end" event', () => {
    const clock = sinon.useFakeTimers();
    const wrapper = shallowMount(Countdown, {
      propsData: { seconds: 2, run: true },
    });
    clock.tick(3000);
    expect(wrapper.text()).to.be.equal('00:00.000');
    expect(wrapper.emitted().end).to.exist;
    clock.restore();
  });
});
