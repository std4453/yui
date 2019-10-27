import { useState, useCallback } from 'react';
import data from './data.json';
// const fs = require("fs")
// const util = require("util")

// const fetch = (url) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(data);
//     }, 1000)
//   })
// }

class Poller {
  constructor(freq, onUpdate, onCreate) {
    this.req = fetch(`http://192.168.187.58:8080/debug/pprof/profile?seconds=1&frequency=${freq}`)
    this.stopped = false
    this.onUpdate = onUpdate
    this.freq = freq

    onCreate()
    this.handleReq()
  }

  handleReq() {
     this.req.then(raw => {
       return raw.json()
     }).then(json => {
      console.log('hfgjhg', this.stopped)

       if(!this.stopped) {
         this.onUpdate(json)

         this.req = fetch(`http://192.168.187.58:8080/debug/pprof/profile?seconds=1&frequency=${this.freq}`)
         this.handleReq()
       }
     })
    // this.req.then(json => {
    //   if (!this.stopped) {
    //     this.onUpdate(json)

    //     this.req = fetch()
    //     this.handleReq()
    //   }
    // })
  }

  stop() {
    this.stopped = true
  }
}

const useProfiler = (options) => {
  const [backtraces, setBacktraces] = useState([]);
  const [loads, setLoads] = useState([]);
  const [status, setStatus] = useState("idle");
  const [poller, setPoller] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [stopTime, setStopTime] = useState(null);

  const start = useCallback((freq) => {
    setBacktraces([]);
    setLoads([]);
    setStartTime(new Date());
    
    setPoller(new Poller(freq, (json) => {
      console.log('asdasd');
      const newBacktraces = [];
      
      json.forEach(item => {
        const frames = item[0].frames

        const stack = []
        frames.forEach(frame => {
          frame.forEach(symbol => {
            if (symbol.name == null) {
              symbol.name = "UNKNOWN"
            }
            
            const name = symbol.name.split("::")
            stack.push(new Entry(name.length > 1 ? name[name.length - 2] : symbol.name, symbol.name, {
              address: `0x${symbol.addr.toString(16).toUpperCase()}`,
              'qualified name': symbol.name,
            }))
          })
        })

        const timestamps = item[1]

        timestamps.forEach(time => newBacktraces.push(new Backtrace(new Date(time * 1000), stack, 1)))
      })
      
      setBacktraces(bts => [...bts, ...newBacktraces]);
      setStatus('profiling');
    }, () => {
    }))
  }, []);

  const stop = useCallback(() => {
    setStopTime(new Date());
    setStatus("stopped")
    poller.stop();
    // setPoller(null);
  }, [poller]);

  return { backtraces, loads, status, startTime, stopTime, start, stop };
}

class Backtrace {
  constructor(timestamp, stack, count) {
    this.timestamp = timestamp
    this.count = count
    this.stack = stack
  }
}

class Entry {
  constructor(name, qualifiedName, attributes) {
    this.name = name
    this.qualifiedName = qualifiedName
    this.attributes = attributes
  }
}

class Load {
  constructor(timestamp, value) {
    this.timestamp = timestamp
    this.value = value
  }
}

const merge = (backtraces) => {
  const node = new Node(new Entry("all", "all", {}))
  node.root = node

  node.append_backtraces(backtraces)

  return node
}

class Node {
  constructor(entry, root) {
    this.entry = entry
    this.count = 0

    if (root === undefined) {
      this.ratio = 1
    } else {
      this.ratio = 0
    }

    this.root = root
    this.children = {}
  }

  append_backtraces(backtraces) {
    backtraces.forEach(backtrace => {
      this.count += backtrace.count
      this.ratio = this.count / this.root.count

      const stack = backtrace.stack

      if (stack.length > 0) {
        const entry = stack[stack.length - 1]

        if (!this.children[entry.qualifiedName]) {
          this.children[entry.qualifiedName] = new Node(entry, this.root)
        }

        if (stack.length > 0) {
          const subStack = backtrace.stack.slice(0, backtrace.stack.length - 1)
          const subBacktrace = new Backtrace(backtrace.timestamp, subStack, backtrace.count)

          this.children[entry.qualifiedName].append_backtraces([subBacktrace])
        }
      }

    })

  }

  transform() {
    const children = []
    for (let name in this.children) {
      const childNode = this.children[name]

      children.push(childNode.transform())
    }

    return new FlameGraphNode(this.entry.name, this.entry, this.count, this.ratio, children)
  }
}

class FlameGraphNode {
  constructor(name, entry, count, ratio, children) {
    this.name = name
    this.entry = entry
    this.value = count
    this.count = count
    this.ratio = ratio
    this.children = children
  }
}

export { useProfiler, merge };

// const profiler = new Profiler()
// profiler.start(100, () => {
//   console.log("update");
//   console.log(util.inspect(merge(profiler.backtraces).transform(), {showHidden: false, depth: null}))
// })
