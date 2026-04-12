#!/bin/bash
git log -p components/JobApplicationForm.tsx | grep -B 10 -A 10 "setTimeout"
