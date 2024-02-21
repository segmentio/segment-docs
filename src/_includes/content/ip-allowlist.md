When data leaves Segment's servers to go to various destinations (not including warehouses), Segment uses Amazon Web Services (AWS) and utilizes many different machines in order to send requests. 

The IP addresses that are used to send these requests can be found [here](https://ip-ranges.amazonaws.com/ip-ranges.json){:target="_blank"}. If you want to allowlist these specific IP addresses, you need to allowlist all of the IP addresses from your workspace's location range. Below are the ranges: 
* For a US workspace: `AWS us-west-2`
* For an EU workspace: `AWS eu-west-1 `