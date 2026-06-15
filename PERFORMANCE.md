# Performance Optimization Report

## Baseline Measurements

### Interaction A: Sort countries

- **Commit duration**: 223 ms
- **Render duration**: 223 ms
- **Screenshot**: ![Sort countries profiler results](performance-starter/screenshots/baseline/image-2.png)

### Interaction B: Search countries

- **Commit duration**: 213 ms
- **Render duration**: 213 ms
- **Screenshot**: ![Search countries profiler results](performance-starter/screenshots/baseline/image-3.png)

### Interaction C: Change year

- **Commit duration**: 242 ms
- **Render duration**: 242 ms
- **Screenshot**: ![Change year profiler results](performance-starter/screenshots/baseline/image-4.png)

### Interaction D: Toggle column

- **Commit duration**: 695 ms
- **Render duration**: 695 ms
- **Screenshot**: ![Toggle column profiler results](performance-starter/screenshots/baseline/image-5.png)

## Optimized Measurements

### Interaction A: Sort countries

- **Commit duration**: 82 ms
- **Render duration**: 80 ms
- **Screenshot**: ![alt text](performance-starter/screenshots/optimized/image.png)

### Interaction B: Search countries

- **Commit duration**: 94 ms
- **Render duration**: 91  ms
- **Screenshot**: ![alt text](performance-starter/screenshots/optimized/image-1.png)

### Interaction C: Change year

- **Commit duration**: 114 ms
- **Render duration**: 112 ms
- **Screenshot**: ![alt text](performance-starter/screenshots/optimized/image-2.png)

### Interaction D: Toggle column

- **Commit duration**: 53 ms
- **Render duration**: 53 ms
- **Screenshot**: ![alt text](performance-starter/screenshots/optimized/image-3.png)

## Summary of Improvements

| Interaction      | Baseline (ms) | Optimized (ms) | Improvement |
| ---------------- | ------------- | -------------- | ----------- |
| Sort countries   | 223        | 82          | -63%     |
| Search countries | 213        | 94          | -55%     |
| Change year      | 242        | 114         | -52%     |
| Toggle column    | 695        | 53          | -92%     |
| **Average**      | **343**    | **86**     | **-75%** |