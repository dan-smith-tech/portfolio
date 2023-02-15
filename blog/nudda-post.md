---
title: Designing and developing interfaces for small screens
description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
thumbnail: plane.png
published: "2022-02-13"
updated: "2022-02-13"
tags:
   - Machine Learning
---

We now look at the programs we want to run The word process is used to describe: the executable code and its data and the associated information the OS needs to run it. _Note this is different from processor and program._ _Note: a process is also known as a task or job: a process that is running that the OS is controlling._ An OS needs to keep a lots of information about a process, including:

-  Where in memory its code is
-  Where in memory its data is
-  What permissions it has on those parts of memory (MMUflags)
-  How much time it is allocated
-  How much time it has used
-  Similarly for other shared resources (e.g., the amount of I/O or networking done)
-  The CPU's PC and registers (e.g., the PC and accumulator)
-  It uses this information to schedule and protect the process

When switching between processes, the operating

The OS intervenes with the fetch execute cycle and it (the OS) loads up the PC with the process it wants to run.

## States

A process can be in one of several states. In a simplified
model, the five main states are:

1. **New**: a process that has just been created
2. **Running**: it is currently executing on the CPU
3. **Ready**: it is ready to run, but some other process (or the OS) is currently using the CPU
4. **Blocked**: waiting for some event or resource to become available. E.g., waiting for a block of data to arrive from the disk
5. **Exit**: a process that has finished

_Note: when writing an OS, the state could be an enumerated type (one of these 5 values)._

_Note: real OSs will have more states than this, but these are the important ones._

We shall assume, for simplicity, that we have just one processor

-  The OS will have lists of processes in each state, so the scheduling decision is **making the choice of which process to move between which states**
-  Again, in real OSs, these will not be simple lists. They might be arranged in priority order, or might be some more sophisticated datastructure: e.g., a pair of lists, one for real-time processes and the other for non-real-time; or a tree
-  Keeping control of the state transitions is what the OS does
-  Prioritisation of processes are part of the OS design decisions: there are many algorithms that are used to determine relative time allocation
   -  The job of the OS is to run all of these in sudo parallelism and have an algorithm that monitors the state (what is/isn't running) and monitors the time allocated to each state

A process will be moved by the OS between the 5 states:

-  A new process will begin in the state **New**
-  A process just finished will be in the state **Exit**
-  In between the OS must decide, as part of its scheduling, where to place each process
-  There is a standard finite state machine that describes the allowed transitions between states

Algorithms that distribute and decide between running, ready, blocked are complex and make each process feel that they have exclusive access to the CPU (when in reality they are sharing it with other processes). THe more processes there are, the more memory there is to store operations, and the more CPU time it takes to run and transition between them all. Fewer windows open on your machine mean less process in the schedule list and therefore fewer processes to schedule.

A typical transition is:

1. The OS decides to schedule a process on the ready list
2. The process is dispatched (i.e., the OS marks its state as Running and starts executing it)
3. The process moves to the Ready sate due to;
   -  The process may choose to voluntarily suspend itself: relinquish (e.g., a clock program displaying the time might suspend itself for a minute)
   -  An interrupt may arise (e.g., from a packet arriving on the network card, or a key being hit on the keyboard)
   -  A timer interrupt may happen when the process has used its time slice
   -  The running process may need some resource the OS must supply (e.g., for disk access) so it does a system call and must wait until the resource is ready (e.g., the disk returns some data); the OS moves it to Blocked.
4. In the case of a blocked process, perhaps data has returned from the disk and the process can wake up and become Ready again. Note that the process won’t necessarily start running immediately, it is just ready to run when it gets its chance

_Note: it’s not the processes moving themselves between the states, it’s the OS moving them between the lists of processes in each state._

We shall assume, for simplicity, that we have just one processor. The OS will have lists of processes in each state, so the scheduling decision is making the choice of which process to move between which states. Again, in real OSs, these will not be simple lists. They might be arranged in priority order, or might be some more sophisticated datastructure (e.g., a pair of lists, one for real-time processes and the other for non-real-time; or a tree).

For example:

-  Windows:
   -  Invoke the task manager (ctrl alt delete) and ask for more detail.
   -  Select processes.
   -  Note:
      -  The number of Apps running vs the number of background processes.
      -  Observe how the OS allocates cpu time to each process.
      -  Selection Performance, App history, Detail and Services options and observe how the OS is working.

## Data structure

What kind of data does the OS need to store and manage to support processes?

-  User identifiers (userids)
-  A priority
-  Statistics like memory and CPU used
-  The state

This collection of data a process needs (the data needed to stop one process and switch to another) is called the process control block, or PCB (e.g., it may contain the PC contents).

_Note: there are still more that will become clearer as we go along._
