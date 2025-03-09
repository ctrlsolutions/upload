<template>
  <div class="report-summary">
    <h1 class="title">QUARTERLY REPORT SUMMARY</h1>
    <p class="date">01/25/25 - 06/25/25</p>

    <div class="report-content">
      <div class="pie-chart-section">
        <div class="total-reports">
          <p class="report-number">69,420</p>
          <p class="report-label">REPORTS</p>
        </div>
        <img src="#" alt="Pie Chart" class="pie-chart" />
      </div>

      <div class="legend">
        <ul>
          <li v-for="(item, index) in reportTypes" :key="index">
            <span :style="{ backgroundColor: item.color }" class="color-box"></span>
            {{ item.label }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuarterlyReportSummary",
  data() {
    return {
      reportTypes: [
        { label: "Research", color: "red" },
        { label: "Publication as a Research Output", color: "orange" },
        { label: "Paper Presentation as a Research Output", color: "yellow" },
        { label: "Patent as a Research Output", color: "green" },
        { label: "Other Research Output", color: "blue" },
        { label: "Training Course and/or Advisory Service", color: "indigo" },
        { label: "Extension Program", color: "purple" },
        { label: "Partnership with Stakeholder", color: "magenta" },
        { label: "Others", color: "gray" }
      ]
    };
  }
};
</script>

<style lang="scss">
.report-summary {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  padding: 30px;

  .title {
    font-size: 3rem;
    font-weight: 900;
    color: maroon;
    margin-bottom: 5px;
  }

  .date {
    font-size: 1.2rem;
    font-weight: bold;
    color: black;
    margin-top: -10px;
  }

  .report-content {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 50px;
    margin-top: 20px;
  }
  .pie-chart-section {
    display: flex;
    flex-direction: column;
    align-items: center;

    .total-reports {
      text-align: center;
      font-size: 2rem;
      font-weight: bold;
      color: black;
    }

    .pie-chart {
      width: 300px;
      height: auto;
    }
  }

    .report-number {
    font-weight: 600; 
    margin-bottom: 0;
  }

  .report-label {
    font-weight: 800;
    margin-top: 0;
  }

  .legend {
    ul {
      list-style: none;
      padding: 0;

      li {
        display: flex;
        align-items: center;
        font-size: 1.2rem;
        margin-bottom: 8px;

        .color-box {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          display: inline-block;
          margin-right: 10px;
        }
      }
    }
  }
}

</style>
