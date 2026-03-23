-- CreateIndex
CREATE INDEX "tournament_maps_tournamentId_idx" ON "tournament_maps"("tournamentId");

-- CreateIndex
CREATE INDEX "tournaments_createdAt_idx" ON "tournaments"("createdAt");

-- CreateIndex
CREATE INDEX "unit_abilities_unitId_idx" ON "unit_abilities"("unitId");

-- CreateIndex
CREATE INDEX "unit_equipment_unitId_idx" ON "unit_equipment"("unitId");

-- CreateIndex
CREATE INDEX "units_teamId_idx" ON "units"("teamId");
