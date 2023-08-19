<template>
    <div>
        <h1>Linked List</h1>
        <div ref="circleContainer"></div>
        <div v-if="showSuccessResult" class="success-message">
            Searched item {{ targetValue }} found at: "{{ result }}"
        </div>

        <div v-if="showFailureResult" class="fail-message">
            Searched item not found!
        </div>
        <hr>
        <form v-if="showInputForm" @submit.prevent="insertFormSubmitAction">
            <input v-model="insertedValue" type="number" name="Number" placeholder="Enter Number">
            <button type="submit">Add</button>
        </form>
        <form v-if="showSearchForm" @submit.prevent="searchIntoLinkedList">
            <input v-model="targetValue" type="number" name="Number" placeholder="Enter Number">
            <button type="submit">Search</button>
        </form>
        <button @click="toggleSearchForm">Search</button>
        <button @click="toggleInsertForm">Insert</button>
    </div>
</template>

<script>
    class Node {
        constructor(data) {
            this.data = data;
            this.next = null;
            this.element = {};
        }
    }

    class LinkedList {
        constructor() {
            this.head = null;
        }

        append(data, element) {
            const newNode = new Node(data);
            newNode.element.circle = element.circle;
            if (!this.head) {
                newNode.element.lines = element.lines;
                this.head = newNode;
                return;
            }

            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.element.lines = element.lines;
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
                result: "",
                showSuccessResult: false,
                showFailureResult: false,
                xAxis: 20,
                arrowXAxis: 0,
                circleRadius: 5,
                elements: [],
                circleContainer: undefined,
                showInputForm: false,
                showSearchForm: false,
                targetValue: null,
                insertedValue: null,
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

            toggleInsertForm() {
                this.showSuccessResult = false;
                this.showFailureResult = false;
                this.showInputForm = !this.showInputForm;
                if (this.showSearchForm) {
                    this.showSearchForm = !this.showSearchForm;
                }

            },
            toggleSearchForm() {
                this.showSuccessResult = false;
                this.showFailureResult = false;
                this.showSearchForm = !this.showSearchForm;
                if (this.showInputForm) {
                    this.showInputForm = !this.showInputForm;
                }
            },

            insertFormSubmitAction() {
                if (this.insertedValue > 0) {

                    this.appendIntoLinkedList(this.insertedValue);
                    this.showInputForm = false;
                    this.insertedValue = null;
                } else {
                    console.error("You've added negative number");
                }
            },

            searchFormSubmitAction() {
                if (this.insertedValue > 0) {

                    this.appendIntoLinkedList(this.insertedValue);
                    this.showInputForm = false;
                    this.insertedValue = null;
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
                if (createArrow) {
                    this.createArrow(this.xAxis + 70);
                }
                this.elements.push({circle: circle, text: text});

                this.xAxis += this.circleRadius * 20;

                return circle;

                //     this.circleContainer.append('circle')
                //         .attr('cx', 90)
                //         .attr('cy', 100)
                //         .attr('r', finalRadius)
                //         .attr('fill', 'red');
                //
                //
            },

            createArrow(arrowX) {
                const arrowLength = 20;
                const arrowY = 100;
                // Line 1: Horizontal line
                const line1 = this.circleContainer.append('line')
                    .attr('x1', arrowX - arrowLength - 20)
                    .attr('y1', arrowY)
                    .attr('x2', arrowX)
                    .attr('y2', arrowY)
                    .attr('stroke', 'black')
                    .attr('stroke-width', 2);

                // Line 2: Diagonal line (left)
                const line2 = this.circleContainer.append('line')
                    .attr('x1', arrowX - 10)
                    .attr('y1', arrowY - 5)
                    .attr('x2', arrowX - arrowLength + 20)
                    .attr('y2', arrowY)
                    .attr('stroke', 'black')
                    .attr('stroke-width', 2);

                // Line 3: Diagonal line (right)
                const line3 = this.circleContainer.append('line')
                    .attr('x1', arrowX - 10)
                    .attr('y1', arrowY + 5)
                    .attr('x2', arrowX - arrowLength + 20)
                    .attr('y2', arrowY)
                    .attr('stroke', 'black')
                    .attr('stroke-width', 2);

                return [line1, line2, line3];
            },

            appendIntoLinkedList(num, pos) {
                if (!pos) {
                    const circle = this.createCircle(num);
                    let line;
                    if(this.linkedList.head){
                        line = this.createArrow((this.xAxis - this.circleRadius * 40) + 70);
                    }

                    this.linkedList.append(num, {circle: circle, lines: line});
                }
            },

            async searchIntoLinkedList() {
                this.showSuccessResult = false;
                this.showFailureResult = false;
                if (this.targetValue > 0) {
                    this.showSearchForm = false;
                    let current = this.linkedList.head;
                    let found;
                    let pos = 1;
                    while (current) {
                        found = current.data == this.targetValue;
                        current.element.circle.transition()
                            .duration(500).attr('fill', "pink");
                        await new Promise(resolve => setTimeout(resolve, 600));
                        if (found) {
                            current.element.circle.transition()
                                .duration(1000).attr('fill', "green");
                            break;
                        }
                        await new Promise(resolve => setTimeout(resolve, 600));
                        if(current.next){
                            for (const line of current.element.lines) {
                                line.transition().duration(300).attr('stroke', "pink");
                            }
                            await new Promise(resolve => setTimeout(resolve, 300));
                        }
                        current = current.next;
                        pos++;
                    }
                    if (found) {
                        this.result = pos;
                        this.showSuccessResult = true;
                        console.log("target found");
                    } else {
                        this.showFailureResult = true;
                    }
                    this.targetValue = null;
                }
            },

            generateLinkedList(nums) {
                for (const n of nums) {
                    this.appendIntoLinkedList(n);
                }
            }
        },
        mounted() {
            this.createContainer();
            this.linkedList = new LinkedList();
            this.generateLinkedList([1, 2, 3])
        },
    }
</script>

<style scoped>
    .success-message {
        background-color: #4caf50;
        color: white;
        padding: 10px;
        border-radius: 5px;
        margin-top: 10px;
    }

    .fail-message {
        background-color: #af3e2e;
        color: white;
        padding: 10px;
        border-radius: 5px;
        margin-top: 10px;
    }

    button {
        background-color: #3c3f41;
        color: white;
        border: none;
        padding: 10px 20px;
        margin: 5px;
        border-radius: 5px;
        cursor: pointer;
    }

    input {
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }
</style>