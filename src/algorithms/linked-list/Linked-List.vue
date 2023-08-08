<template>
    <div>
        <h1>Linked List</h1>
        <div ref="circleContainer"></div>
        <form v-if="showInputForm" @submit.prevent="formSubmitAction">
            <input v-model="insertedValue" type="number" name="Number" id="" placeholder="Enter Number">
            <button type="submit" :="insertedValue">Add</button>
        </form>
        <button @click="change">Animation</button>
        <button @click="toggleForm">Insert</button>
    </div>
</template>

<script>
    class Node {
        constructor(data) {
            this.data = data;
            this.next = null;
        }
    }

    class LinkedList {
        constructor() {
            this.head = null;
        }

        append(data) {
            const newNode = new Node(data);
            if (!this.head) {
                this.head = newNode;
                return;
            }

            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }

        display() {
            let current = this.head;
            while (current) {
                console.log(current.data);
                current = current.next;
            }
        }
    }


    import * as d3 from 'd3';

    export default {
        name: "Linked-List",
        data() {
            return {
                linkedList: undefined,
                xAxis: 20,
                arrowXAxis: 0,
                circleRadius: 5,
                elements: [],
                circleContainer: undefined,
                showInputForm: false,
                insertedValue: undefined,
            }
        },

        methods: {
            createContainer() {
                this.circleContainer = d3.select(this.$refs.circleContainer)
                    .append('svg')
                    .attr('width', 500)
                    .attr('height', 200);
            },

            change() {
                for (const element of this.elements) {
                    element.circle.transition()
                        .duration(1000) // Animation duration in milliseconds
                        .attr('fill', 'rgba(0, 255, 0, 0.8)');
                }

            },

            toggleForm() {
                this.showInputForm = !this.showInputForm;
            },

            formSubmitAction() {
                if (this.insertedValue > 0) {
                    this.appendIntoLinkedList(this.insertedValue);
                    this.createArrow((this.xAxis - this.circleRadius * 20) + 70);
                    this.createCircle(this.insertedValue);
                    this.showInputForm = false;
                } else {
                    console.error("You've added negative number");
                }
            },

            createCircle(num, createArrow) {

                const finalRadius = 20;

                const circle = this.circleContainer.append('circle')
                    .attr('cx', this.xAxis)
                    .attr('cy', 100)
                    .attr('r', this.circleRadius)
                    .attr('fill', 'rgba(0, 0, 255, 0.5)')
                    .attr('opacity', .5);
                circle.transition()
                    .duration(1000) // Animation duration in milliseconds
                    .attr('r', finalRadius);

                const text = this.circleContainer.append('text')
                    .attr('x', this.xAxis)
                    .attr('y', 100)
                    .attr('dy', '.4em') // Vertical alignment adjustment
                    .attr('text-anchor', 'middle') // Horizontal alignment
                    .text(num);
                if(createArrow){
                    this.createArrow(this.xAxis+70);
                }
                this.elements.push({circle: circle, text: text});

                this.xAxis += this.circleRadius * 20;

                //     this.circleContainer.append('circle')
                //         .attr('cx', 90)
                //         .attr('cy', 100)
                //         .attr('r', finalRadius)
                //         .attr('fill', 'red');
                //
                //
            },

            createArrow(arrowX){
                const arrowLength = 20;
                const arrowY = 100;
                // Line 1: Horizontal line
                this.circleContainer.append('line')
                    .attr('x1', arrowX - arrowLength - 20)
                    .attr('y1', arrowY)
                    .attr('x2', arrowX)
                    .attr('y2', arrowY)
                    .attr('stroke', 'black')
                    .attr('stroke-width', 2);

                // Line 2: Diagonal line (left)
                this.circleContainer.append('line')
                    .attr('x1', arrowX - 10)
                    .attr('y1', arrowY - 5)
                    .attr('x2', arrowX - arrowLength + 20)
                    .attr('y2', arrowY)
                    .attr('stroke', 'black')
                    .attr('stroke-width', 2);

                // Line 3: Diagonal line (right)
                this.circleContainer.append('line')
                    .attr('x1', arrowX - 10)
                    .attr('y1', arrowY + 5)
                    .attr('x2', arrowX - arrowLength + 20)
                    .attr('y2', arrowY)
                    .attr('stroke', 'black')
                    .attr('stroke-width', 2);
            },

            appendIntoLinkedList(num, pos) {
                if (!pos) {
                    this.linkedList.append(num);
                }
            },

            generateLinkedList() {
                let current = this.linkedList.head;
                while (current) {
                    this.createCircle(current.data, current.next);
                    current = current.next;
                }
            }
        },
        mounted() {
            this.createContainer();
            this.linkedList = new LinkedList();
            this.linkedList.append(1);
            this.linkedList.append(2);
            this.linkedList.append(3);
            this.linkedList.append(5);
            this.linkedList.append(7);
            this.generateLinkedList();

        },
    }
</script>

<style scoped>

</style>