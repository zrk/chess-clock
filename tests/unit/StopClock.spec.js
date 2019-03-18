import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';

import StopClock from '@/components/StopClock.vue';
import Countdown from '@/components/Countdown.vue';

describe('StopClock.vue', () => {
  let stopclock;
  let button;
  let countdown;

  beforeEach(() => {
    stopclock = shallowMount(StopClock);
    button = stopclock.find('button');
    countdown = stopclock.find(Countdown);
  });

  it('wraps Countdown component', () => {
    expect(stopclock.contains(Countdown)).to.be.true;
  });

  it('has a button', () => {
    expect(stopclock.contains('button')).to.be.true;
  });

  it('makes Countdown start and stop on ":run" prop', () => {
    stopclock.setProps({ run: true });
    expect(countdown.props().run).to.equal(true);

    stopclock.setProps({ run: false });
    expect(countdown.props().run).to.equal(false);

    stopclock.setProps({ run: true });
    expect(countdown.props().run).to.equal(true);
  });

  it('enables button when Countdown started, disables - when stopped', () => {
    countdown.vm.$emit('start');
    expect(button.element.disabled).to.be.false;

    countdown.vm.$emit('stop');
    expect(button.element.disabled).to.be.true;

    countdown.vm.$emit('start');
    expect(button.element.disabled).to.be.false;
  });

  it('makes Countdown stop on button click', () => {
    countdown.setProps({ run: true });
    countdown.vm.$emit('start'); // to enable the button
    button.trigger('click');
    expect(countdown.props().run).to.equal(false);
  });

  it('propagates Countdown\'s "start", "stop", and "end" events', () => {
    countdown.vm.$emit('start');
    expect(stopclock.emitted().start).to.exist;

    countdown.vm.$emit('stop');
    expect(stopclock.emitted().stop).to.exist;

    countdown.vm.$emit('end');
    expect(stopclock.emitted().end).to.exist;
  });

  it('indicates the "out of time" state', () => {
    const clockface = stopclock.find('.stop-clock__face');

    expect(clockface.element.className).to.not.include('ended');
    countdown.vm.$emit('end');
    expect(clockface.element.className).to.include('ended');
  });
});
